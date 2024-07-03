import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AvailabilityScheduleEntryInsertDto } from '../dto/AvailabilityScheduleEntryInsert.dto';
import { AvailabilityScheduleEntryUpdateDto } from '../dto/AvailabilityScheduleEntryUpdate.dto';
import { AvailabilityScheduleEntryUpdateBulkDto } from '../dto/AvailabilityScheduleEntryUpdateBulk.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { AvailabilityScheduleEntry } from '../entities/AvailabilityScheduleEntry.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { IdenticalEntityError } from '../errors/IdenticalEntity.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class AvailabilityScheduleEntryService {
    constructor(
        @InjectRepository(AvailabilityScheduleEntry, 'mySqlConnection')
        private readonly availabilityScheduleEntryRepository: Repository<AvailabilityScheduleEntry>,
        @InjectRepository(AvailabilitySchedule, 'mySqlConnection')
        private readonly availabilityScheduleRepository: Repository<AvailabilitySchedule>
    ) {}

    async getAll(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AvailabilityScheduleEntry>> {
        const [availabilityScheduleEntries, count] =
            await this.availabilityScheduleEntryRepository.findAndCount({
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(availabilityScheduleEntries, pageMetaDto);
    }

    async getAllByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AvailabilityScheduleEntry>> {
        const [availabilityScheduleEntries, count] =
            await this.availabilityScheduleEntryRepository.findAndCount({
                where: {
                    availabilitySchedule: {
                        cycle: { id: cycleId },
                        professor: { id: professorId }
                    }
                },
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(availabilityScheduleEntries, pageMetaDto);
    }

    async getAllByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<AvailabilityScheduleEntry>> {
        const [availabilityScheduleEntries, count] =
            await this.availabilityScheduleEntryRepository.findAndCount({
                where: {
                    availabilitySchedule: {
                        classroom: { id: classroomId },
                        cycle: { id: cycleId }
                    }
                },
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(availabilityScheduleEntries, pageMetaDto);
    }

    async getById(id: number): Promise<AvailabilityScheduleEntry> {
        const availabilityScheduleEntry =
            await this.availabilityScheduleEntryRepository.findOneBy({
                id: id
            });

        if (!availabilityScheduleEntry) {
            throw new EntityNotFoundError(
                'AvailabilityScheduleEntry not found'
            );
        }

        return availabilityScheduleEntry;
    }

    async insertByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        availabilityScheduleEntryInsertDto: AvailabilityScheduleEntryInsertDto
    ): Promise<AvailabilityScheduleEntry> {
        let availabilitySchedule =
            await this.availabilityScheduleRepository.findOne({
                where: {
                    professor: { id: professorId },
                    cycle: { id: cycleId }
                }
            });

        if (!availabilitySchedule) {
            throw new EntityNotFoundError(
                'AvailabilitySchedule does not exist'
            );
        }

        let existingScheduleEntry =
            await this.availabilityScheduleEntryRepository.findOne({
                where: {
                    availabilitySchedule: {
                        professor: { id: professorId },
                        cycle: { id: cycleId }
                    },
                    day: availabilityScheduleEntryInsertDto.day,
                    hour: availabilityScheduleEntryInsertDto.hour
                }
            });

        if (existingScheduleEntry) {
            throw new IdenticalEntityError(
                'AvailabilityScheduleEntry already exists'
            );
        }

        const availabilityScheduleEntry = new AvailabilityScheduleEntry();

        availabilityScheduleEntry.day = availabilityScheduleEntryInsertDto.day;
        availabilityScheduleEntry.hour =
            availabilityScheduleEntryInsertDto.hour;
        availabilityScheduleEntry.active =
            availabilityScheduleEntryInsertDto.active;

        availabilityScheduleEntry.availabilitySchedule = availabilitySchedule;

        return await this.availabilityScheduleEntryRepository.save(
            availabilityScheduleEntry
        );
    }

    async insertByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        availabilityScheduleEntryInsertDto: AvailabilityScheduleEntryInsertDto
    ): Promise<AvailabilityScheduleEntry> {
        const availabilitySchedule =
            await this.availabilityScheduleRepository.findOne({
                where: {
                    classroom: { id: classroomId },
                    cycle: { id: cycleId }
                }
            });

        if (!availabilitySchedule) {
            throw new EntityNotFoundError(
                'AvailabilitySchedule does not exist'
            );
        }

        const existingScheduleEntry =
            await this.availabilityScheduleEntryRepository.findOne({
                where: {
                    availabilitySchedule: {
                        classroom: { id: classroomId },
                        cycle: { id: cycleId }
                    },
                    day: availabilityScheduleEntryInsertDto.day,
                    hour: availabilityScheduleEntryInsertDto.hour
                }
            });

        if (existingScheduleEntry) {
            throw new IdenticalEntityError(
                'AvailabilityScheduleEntry already exists'
            );
        }

        const availabilityScheduleEntry = new AvailabilityScheduleEntry();

        availabilityScheduleEntry.day = availabilityScheduleEntryInsertDto.day;
        availabilityScheduleEntry.hour =
            availabilityScheduleEntryInsertDto.hour;
        availabilityScheduleEntry.active =
            availabilityScheduleEntryInsertDto.active;

        availabilityScheduleEntry.availabilitySchedule = availabilitySchedule;

        return await this.availabilityScheduleEntryRepository.save(
            availabilityScheduleEntry
        );
    }

    async insertManyByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        availabilityScheduleEntryInsertDtos: AvailabilityScheduleEntryInsertDto[]
    ): Promise<AvailabilityScheduleEntry[]> {
        let availabilitySchedule =
            await this.availabilityScheduleRepository.findOne({
                where: {
                    professor: { id: professorId },
                    cycle: { id: cycleId }
                }
            });

        if (!availabilitySchedule) {
            throw new EntityNotFoundError(
                'AvailabilitySchedule does not exist'
            );
        }

        const availabilityScheduleEntries: AvailabilityScheduleEntry[] = [];

        for (const availabilityScheduleEntryInsertDto of availabilityScheduleEntryInsertDtos) {
            let existingScheduleEntry =
                await this.availabilityScheduleEntryRepository.findOne({
                    where: {
                        availabilitySchedule: {
                            professor: { id: professorId },
                            cycle: { id: cycleId }
                        },
                        day: availabilityScheduleEntryInsertDto.day,
                        hour: availabilityScheduleEntryInsertDto.hour
                    }
                });

            if (existingScheduleEntry) {
                throw new IdenticalEntityError(
                    'AvailabilityScheduleEntry already exists'
                );
            }

            const availabilityScheduleEntry = new AvailabilityScheduleEntry();

            availabilityScheduleEntry.day =
                availabilityScheduleEntryInsertDto.day;
            availabilityScheduleEntry.hour =
                availabilityScheduleEntryInsertDto.hour;
            availabilityScheduleEntry.active =
                availabilityScheduleEntryInsertDto.active;

            availabilityScheduleEntry.availabilitySchedule =
                availabilitySchedule;
        }

        return await this.availabilityScheduleEntryRepository.save(
            availabilityScheduleEntries
        );
    }

    async insertManyByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        availabilityScheduleEntryInsertDtos: AvailabilityScheduleEntryInsertDto[]
    ): Promise<AvailabilityScheduleEntry[]> {
        let availabilitySchedule =
            await this.availabilityScheduleRepository.findOne({
                where: {
                    classroom: { id: classroomId },
                    cycle: { id: cycleId }
                }
            });

        if (!availabilitySchedule) {
            throw new EntityNotFoundError(
                'AvailabilitySchedule does not exist'
            );
        }

        const availabilityScheduleEntries: AvailabilityScheduleEntry[] = [];

        for (const availabilityScheduleEntryInsertDto of availabilityScheduleEntryInsertDtos) {
            let existingScheduleEntry =
                await this.availabilityScheduleEntryRepository.findOne({
                    where: {
                        availabilitySchedule: {
                            classroom: { id: classroomId },
                            cycle: { id: cycleId }
                        },
                        day: availabilityScheduleEntryInsertDto.day,
                        hour: availabilityScheduleEntryInsertDto.hour
                    }
                });

            if (existingScheduleEntry) {
                throw new IdenticalEntityError(
                    'AvailabilityScheduleEntry already exists'
                );
            }

            const availabilityScheduleEntry = new AvailabilityScheduleEntry();

            availabilityScheduleEntry.day =
                availabilityScheduleEntryInsertDto.day;
            availabilityScheduleEntry.hour =
                availabilityScheduleEntryInsertDto.hour;
            availabilityScheduleEntry.active =
                availabilityScheduleEntryInsertDto.active;

            availabilityScheduleEntry.availabilitySchedule =
                availabilitySchedule;
        }

        return await this.availabilityScheduleEntryRepository.save(
            availabilityScheduleEntries
        );
    }

    async updateByCycleIdAndProfessorIdAndDayAndHour(
        cycleId: number,
        professorId: number,
        day: number,
        hour: number,
        availabilityScheduleEntryUpdateDto: AvailabilityScheduleEntryUpdateDto
    ): Promise<AvailabilityScheduleEntry> {
        let existingScheduleEntry =
            await this.availabilityScheduleEntryRepository.findOne({
                where: {
                    availabilitySchedule: {
                        cycle: { id: cycleId },
                        professor: { id: professorId }
                    },
                    day: day,
                    hour: hour
                }
            });

        if (!existingScheduleEntry) {
            throw new EntityNotFoundError(
                'AvailabilityScheduleEntry not found'
            );
        }

        if (availabilityScheduleEntryUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                -1
            );
        }

        if (
            availabilityScheduleEntryUpdateDto.version !==
            existingScheduleEntry.version
        ) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                availabilityScheduleEntryUpdateDto.version
            );
        }

        if (availabilityScheduleEntryUpdateDto.active != null) {
            existingScheduleEntry.active =
                availabilityScheduleEntryUpdateDto.active;
        }

        return await this.availabilityScheduleEntryRepository.save(
            existingScheduleEntry
        );
    }

    async updateByCycleIdAndClassroomIdAndDayAndHour(
        cycleId: number,
        classroomId: number,
        day: number,
        hour: number,
        availabilityScheduleEntryUpdateDto: AvailabilityScheduleEntryUpdateDto
    ): Promise<AvailabilityScheduleEntry> {
        const existingScheduleEntry =
            await this.availabilityScheduleEntryRepository.findOne({
                where: {
                    availabilitySchedule: {
                        classroom: { id: classroomId },
                        cycle: { id: cycleId }
                    },
                    day: day,
                    hour: hour
                }
            });

        if (!existingScheduleEntry) {
            throw new EntityNotFoundError(
                'AvailabilityScheduleEntry not found'
            );
        }

        if (availabilityScheduleEntryUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                -1
            );
        }

        if (
            availabilityScheduleEntryUpdateDto.version !==
            existingScheduleEntry.version
        ) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                availabilityScheduleEntryUpdateDto.version
            );
        }

        if (availabilityScheduleEntryUpdateDto.active != null) {
            existingScheduleEntry.active =
                availabilityScheduleEntryUpdateDto.active;
        }

        return await this.availabilityScheduleEntryRepository.save(
            existingScheduleEntry
        );
    }

    async updateManyByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        availabilityScheduleEntryUpdateBulkDtos: AvailabilityScheduleEntryUpdateBulkDto[]
    ): Promise<AvailabilityScheduleEntry[]> {
        const availabilityScheduleEntries: AvailabilityScheduleEntry[] = [];

        for (const availabilityScheduleEntryUpdateBulkDto of availabilityScheduleEntryUpdateBulkDtos) {
            let existingScheduleEntry =
                await this.availabilityScheduleEntryRepository.findOne({
                    where: {
                        availabilitySchedule: {
                            cycle: { id: cycleId },
                            professor: { id: professorId }
                        },
                        day: availabilityScheduleEntryUpdateBulkDto.day,
                        hour: availabilityScheduleEntryUpdateBulkDto.hour
                    }
                });

            if (!existingScheduleEntry) {
                throw new EntityNotFoundError(
                    'AvailabilityScheduleEntry not found'
                );
            }

            if (availabilityScheduleEntryUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingScheduleEntry.version,
                    -1
                );
            }

            if (
                availabilityScheduleEntryUpdateBulkDto.version !==
                existingScheduleEntry.version
            ) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingScheduleEntry.version,
                    availabilityScheduleEntryUpdateBulkDto.version
                );
            }

            if (availabilityScheduleEntryUpdateBulkDto.active != null) {
                existingScheduleEntry.active =
                    availabilityScheduleEntryUpdateBulkDto.active;
            }

            availabilityScheduleEntries.push(existingScheduleEntry);
        }

        return await this.availabilityScheduleEntryRepository.save(
            availabilityScheduleEntries
        );
    }

    async updateManyByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        availabilityScheduleEntryUpdateBulkDtos: AvailabilityScheduleEntryUpdateBulkDto[]
    ): Promise<AvailabilityScheduleEntry[]> {
        const availabilityScheduleEntries: AvailabilityScheduleEntry[] = [];

        for (const availabilityScheduleEntryUpdateBulkDto of availabilityScheduleEntryUpdateBulkDtos) {
            let existingScheduleEntry =
                await this.availabilityScheduleEntryRepository.findOne({
                    where: {
                        availabilitySchedule: {
                            cycle: { id: cycleId },
                            classroom: { id: classroomId }
                        },
                        day: availabilityScheduleEntryUpdateBulkDto.day,
                        hour: availabilityScheduleEntryUpdateBulkDto.hour
                    }
                });

            if (!existingScheduleEntry) {
                throw new EntityNotFoundError(
                    'AvailabilityScheduleEntry not found'
                );
            }

            if (availabilityScheduleEntryUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingScheduleEntry.version,
                    -1
                );
            }

            if (
                availabilityScheduleEntryUpdateBulkDto.version !==
                existingScheduleEntry.version
            ) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingScheduleEntry.version,
                    availabilityScheduleEntryUpdateBulkDto.version
                );
            }

            if (availabilityScheduleEntryUpdateBulkDto.active != null) {
                existingScheduleEntry.active =
                    availabilityScheduleEntryUpdateBulkDto.active;
            }

            availabilityScheduleEntries.push(existingScheduleEntry);
        }

        return await this.availabilityScheduleEntryRepository.save(
            availabilityScheduleEntries
        );
    }
}
