import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { AvailabilityScheduleInsertDto } from '../dto/AvailabilityScheduleInsert.dto';
import { AvailabilityScheduleUpdateDto } from '../dto/AvailabilityScheduleUpdate.dto';
import { AvailabilityScheduleOptionsDto } from '../dto/options/AvailabilityScheduleOptions.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { AvailabilityScheduleEntry } from '../entities/AvailabilityScheduleEntry.entity';
import { Classroom } from '../entities/Classroom.entity';
import { Cycle } from '../entities/Cycle.entity';
import { Professor } from '../entities/Professor.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class AvailabilityScheduleService {
    constructor(
        @InjectRepository(Cycle, 'mySqlConnection')
        private readonly cycleRepository: Repository<Cycle>,
        @InjectRepository(Classroom, 'mySqlConnection')
        private readonly classroomRepository: Repository<Classroom>,
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>,
        @InjectRepository(AvailabilitySchedule, 'mySqlConnection')
        private readonly availabilityScheduleRepository: Repository<AvailabilitySchedule>
    ) {}

    async getAll(
        availabilityScheduleOptions: AvailabilityScheduleOptionsDto,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AvailabilitySchedule>> {
        const [availabilitySchedules, count] =
            await this.availabilityScheduleRepository.findAndCount({
                relations: {
                    cycle: availabilityScheduleOptions.includeCycle,
                    entries: availabilityScheduleOptions.includeEntries
                },
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(availabilitySchedules, pageMetaDto);
    }

    async getAllByProfessorId(
        professorId: number,
        availabilityScheduleOptions: AvailabilityScheduleOptionsDto,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AvailabilitySchedule>> {
        const [availabilitySchedules, count] =
            await this.availabilityScheduleRepository.findAndCount({
                relations: {
                    cycle: availabilityScheduleOptions.includeCycle,
                    entries: availabilityScheduleOptions.includeEntries
                },
                where: {
                    professor: { id: professorId }
                },
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(availabilitySchedules, pageMetaDto);
    }

    async getAllByClassroomId(
        classroomId: number,
        availabilityScheduleOptions: AvailabilityScheduleOptionsDto,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AvailabilitySchedule>> {
        const [availabilitySchedules, count] =
            await this.availabilityScheduleRepository.findAndCount({
                relations: {
                    cycle: availabilityScheduleOptions.includeCycle,
                    entries: availabilityScheduleOptions.includeEntries
                },
                where: {
                    classroom: { id: classroomId }
                },
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(availabilitySchedules, pageMetaDto);
    }

    async getByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        availabilityScheduleOptions: AvailabilityScheduleOptionsDto
    ): Promise<AvailabilitySchedule> {
        const availabilitySchedule =
            await this.availabilityScheduleRepository.findOne({
                relations: {
                    cycle: availabilityScheduleOptions.includeCycle,
                    entries: availabilityScheduleOptions.includeEntries
                },
                where: {
                    cycle: { id: cycleId },
                    professor: { id: professorId }
                }
            });

        if (!availabilitySchedule) {
            throw new EntityNotFoundError('AvailabilitySchedule not found');
        }

        return availabilitySchedule;
    }

    async getByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        availabilityScheduleOptions: AvailabilityScheduleOptionsDto
    ): Promise<AvailabilitySchedule> {
        const availabilitySchedule =
            await this.availabilityScheduleRepository.findOne({
                relations: {
                    cycle: availabilityScheduleOptions.includeCycle,
                    entries: availabilityScheduleOptions.includeEntries
                },
                where: {
                    classroom: { id: classroomId },
                    cycle: { id: cycleId }
                }
            });

        if (!availabilitySchedule) {
            throw new EntityNotFoundError('AvailabilitySchedule not found');
        }

        return availabilitySchedule;
    }

    async insertByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        availabilityScheduleInsertDto: AvailabilityScheduleInsertDto
    ): Promise<AvailabilitySchedule> {
        const professor = await this.professorRepository.findOneBy({
            id: professorId
        });

        if (!professor) {
            throw new EntityNotFoundError('Professor not found');
        }

        const cycle = await this.cycleRepository.findOneBy({
            id: cycleId
        });

        if (!cycle) {
            throw new EntityNotFoundError('Cycle not found');
        }

        const availabilitySchedule = new AvailabilitySchedule();

        availabilitySchedule.cycle = cycle;
        availabilitySchedule.professor = professor;
        availabilitySchedule.title = availabilityScheduleInsertDto.title;

        if (availabilityScheduleInsertDto.description != null) {
            availabilitySchedule.description =
                availabilityScheduleInsertDto.description;
        }

        if (availabilityScheduleInsertDto.entries != null) {
            availabilitySchedule.entries = [];

            for (const entry of availabilityScheduleInsertDto.entries) {
                const availabilityScheduleEntry =
                    new AvailabilityScheduleEntry();

                availabilityScheduleEntry.day = entry.day;
                availabilityScheduleEntry.hour = entry.hour;
                availabilityScheduleEntry.value = entry.value;

                availabilitySchedule.entries.push(availabilityScheduleEntry);
            }
        }

        return await this.availabilityScheduleRepository.save(
            availabilitySchedule
        );
    }

    async insertByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        availabilityScheduleInsertDto: AvailabilityScheduleInsertDto
    ): Promise<AvailabilitySchedule> {
        const classroom = await this.classroomRepository.findOneBy({
            id: classroomId
        });

        if (!classroom) {
            throw new EntityNotFoundError('Classroom not found');
        }

        const cycle = await this.cycleRepository.findOneBy({
            id: cycleId
        });

        if (!cycle) {
            throw new EntityNotFoundError('Cycle not found');
        }

        const availabilitySchedule = new AvailabilitySchedule();

        availabilitySchedule.cycle = cycle;
        availabilitySchedule.classroom = classroom;
        availabilitySchedule.title = availabilityScheduleInsertDto.title;

        if (availabilityScheduleInsertDto.description != null) {
            availabilitySchedule.description =
                availabilityScheduleInsertDto.description;
        }

        if (availabilityScheduleInsertDto.entries != null) {
            availabilitySchedule.entries = [];

            for (const entry of availabilityScheduleInsertDto.entries) {
                const availabilityScheduleEntry =
                    new AvailabilityScheduleEntry();

                availabilityScheduleEntry.day = entry.day;
                availabilityScheduleEntry.hour = entry.hour;
                availabilityScheduleEntry.value = entry.value;

                availabilitySchedule.entries.push(availabilityScheduleEntry);
            }
        }

        return await this.availabilityScheduleRepository.save(
            availabilitySchedule
        );
    }

    async updateByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        availabilityScheduleUpdateDto: AvailabilityScheduleUpdateDto
    ): Promise<AvailabilitySchedule> {
        const existingSchedule =
            await this.availabilityScheduleRepository.findOne({
                relations: { entries: true },
                where: {
                    cycle: {
                        id: cycleId
                    },
                    professor: {
                        id: professorId
                    }
                }
            });

        if (!existingSchedule) {
            throw new EntityNotFoundError('AvailabilitySchedule not found');
        }

        if (availabilityScheduleUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                -1
            );
        }

        if (
            availabilityScheduleUpdateDto.version !== existingSchedule.version
        ) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                availabilityScheduleUpdateDto.version
            );
        }

        if (availabilityScheduleUpdateDto.title != null) {
            existingSchedule.title = availabilityScheduleUpdateDto.title;
        }

        if (availabilityScheduleUpdateDto.description != null) {
            existingSchedule.description =
                availabilityScheduleUpdateDto.description;
        }

        if (availabilityScheduleUpdateDto.entries != null) {
            for (const availabilityScheduleEntryUpdateBulkDto of availabilityScheduleUpdateDto.entries) {
                const existingScheduleEntry = existingSchedule.entries.filter(
                    (existingEntry) => {
                        return (
                            existingEntry.day ==
                                availabilityScheduleEntryUpdateBulkDto.day &&
                            existingEntry.hour ==
                                availabilityScheduleEntryUpdateBulkDto.hour
                        );
                    }
                )[0];

                if (!existingScheduleEntry) {
                    const availabilityScheduleEntry =
                        new AvailabilityScheduleEntry();

                    availabilityScheduleEntry.day =
                        availabilityScheduleEntryUpdateBulkDto.day;
                    availabilityScheduleEntry.hour =
                        availabilityScheduleEntryUpdateBulkDto.hour;

                    if (availabilityScheduleEntryUpdateBulkDto.value != null) {
                        availabilityScheduleEntry.value =
                            availabilityScheduleEntryUpdateBulkDto.value;
                    }

                    existingSchedule.entries.push(availabilityScheduleEntry);
                    continue;
                }

                if (availabilityScheduleEntryUpdateBulkDto.value != null) {
                    existingScheduleEntry.value =
                        availabilityScheduleEntryUpdateBulkDto.value;
                }
            }
        }

        return await this.availabilityScheduleRepository.save(existingSchedule);
    }

    async updateByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        availabilityScheduleUpdateDto: AvailabilityScheduleUpdateDto
    ): Promise<AvailabilitySchedule> {
        const existingSchedule =
            await this.availabilityScheduleRepository.findOne({
                relations: { entries: true },
                where: {
                    classroom: {
                        id: classroomId
                    },
                    cycle: {
                        id: cycleId
                    }
                }
            });

        if (!existingSchedule) {
            throw new EntityNotFoundError('AvailabilitySchedule not found');
        }

        if (availabilityScheduleUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                -1
            );
        }

        if (
            availabilityScheduleUpdateDto.version !== existingSchedule.version
        ) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                availabilityScheduleUpdateDto.version
            );
        }

        if (availabilityScheduleUpdateDto.title != null) {
            existingSchedule.title = availabilityScheduleUpdateDto.title;
        }

        if (availabilityScheduleUpdateDto.description != null) {
            existingSchedule.description =
                availabilityScheduleUpdateDto.description;
        }

        if (availabilityScheduleUpdateDto.entries != null) {
            for (const availabilityScheduleEntryUpdateBulkDto of availabilityScheduleUpdateDto.entries) {
                const existingScheduleEntry = existingSchedule.entries.filter(
                    (existingEntry) => {
                        return (
                            existingEntry.day ==
                                availabilityScheduleEntryUpdateBulkDto.day &&
                            existingEntry.hour ==
                                availabilityScheduleEntryUpdateBulkDto.hour
                        );
                    }
                )[0];

                if (!existingScheduleEntry) {
                    const availabilityScheduleEntry =
                        new AvailabilityScheduleEntry();

                    availabilityScheduleEntry.day =
                        availabilityScheduleEntryUpdateBulkDto.day;
                    availabilityScheduleEntry.hour =
                        availabilityScheduleEntryUpdateBulkDto.hour;

                    if (availabilityScheduleEntryUpdateBulkDto.value != null) {
                        availabilityScheduleEntry.value =
                            availabilityScheduleEntryUpdateBulkDto.value;
                    }

                    existingSchedule.entries.push(availabilityScheduleEntry);
                    continue;
                }

                if (availabilityScheduleEntryUpdateBulkDto.value != null) {
                    existingScheduleEntry.value =
                        availabilityScheduleEntryUpdateBulkDto.value;
                }
            }
        }

        return await this.availabilityScheduleRepository.save(existingSchedule);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.availabilityScheduleRepository.delete(id);
    }
}
