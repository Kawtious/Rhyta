import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ScheduleEntryInsertDto } from '../dto/ScheduleEntryInsert.dto';
import { ScheduleEntryUpdateDto } from '../dto/ScheduleEntryUpdate.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleEntry } from '../entities/ScheduleEntry.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { IdenticalEntityError } from '../errors/IdenticalEntityError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ScheduleEntryService {
    constructor(
        @InjectRepository(ScheduleEntry, 'mySqlConnection')
        private readonly scheduleEntryRepository: Repository<ScheduleEntry>,
        @InjectRepository(Schedule, 'mySqlConnection')
        private readonly scheduleRepository: Repository<Schedule>
    ) {}

    async getAll(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<ScheduleEntry>> {
        const [scheduleEntries, count] =
            await this.scheduleEntryRepository.findAndCount({
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(scheduleEntries, pageMetaDto);
    }

    async getAllByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<ScheduleEntry>> {
        const [scheduleEntries, count] =
            await this.scheduleEntryRepository.findAndCount({
                where: {
                    schedule: {
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

        return new PageDto(scheduleEntries, pageMetaDto);
    }

    async getAllByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<ScheduleEntry>> {
        const [scheduleEntries, count] =
            await this.scheduleEntryRepository.findAndCount({
                where: {
                    schedule: {
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

        return new PageDto(scheduleEntries, pageMetaDto);
    }

    async getById(id: number): Promise<ScheduleEntry> {
        const scheduleEntry = await this.scheduleEntryRepository.findOneBy({
            id: id
        });

        if (!scheduleEntry) {
            throw new EntityNotFoundError('ScheduleEntry not found');
        }

        return scheduleEntry;
    }

    async insertByProfessorId(
        professorId: number,
        scheduleEntryInsertDto: ScheduleEntryInsertDto
    ): Promise<ScheduleEntry> {
        const scheduleEntry = new ScheduleEntry();

        let schedule = await this.scheduleRepository.findOne({
            where: {
                professor: { id: professorId },
                cycle: { id: scheduleEntryInsertDto.cycleId }
            }
        });

        if (!schedule) {
            throw new EntityNotFoundError('Schedule does not exist');
        }

        let existingScheduleEntry = await this.scheduleEntryRepository.findOne({
            where: {
                schedule: {
                    professor: { id: professorId },
                    cycle: { id: scheduleEntryInsertDto.cycleId }
                },
                day: scheduleEntryInsertDto.day,
                hour: scheduleEntryInsertDto.hour
            }
        });

        if (existingScheduleEntry) {
            throw new IdenticalEntityError('ScheduleEntry already exists');
        }

        scheduleEntry.day = scheduleEntryInsertDto.day;
        scheduleEntry.hour = scheduleEntryInsertDto.hour;
        scheduleEntry.active = scheduleEntryInsertDto.active;

        scheduleEntry.schedule = schedule;

        return await this.scheduleEntryRepository.save(scheduleEntry);
    }

    async insertByClassroomId(
        classroomId: number,
        scheduleEntryInsertDto: ScheduleEntryInsertDto
    ): Promise<ScheduleEntry> {
        const scheduleEntry = new ScheduleEntry();

        const schedule = await this.scheduleRepository.findOne({
            where: {
                classroom: { id: classroomId },
                cycle: { id: scheduleEntryInsertDto.cycleId }
            }
        });

        if (!schedule) {
            throw new EntityNotFoundError('Schedule does not exist');
        }

        const existingScheduleEntry =
            await this.scheduleEntryRepository.findOne({
                where: {
                    schedule: {
                        classroom: { id: classroomId },
                        cycle: { id: scheduleEntryInsertDto.cycleId }
                    },
                    day: scheduleEntryInsertDto.day,
                    hour: scheduleEntryInsertDto.hour
                }
            });

        if (existingScheduleEntry) {
            throw new IdenticalEntityError('ScheduleEntry already exists');
        }

        scheduleEntry.day = scheduleEntryInsertDto.day;
        scheduleEntry.hour = scheduleEntryInsertDto.hour;
        scheduleEntry.active = scheduleEntryInsertDto.active;

        scheduleEntry.schedule = schedule;

        return await this.scheduleEntryRepository.save(scheduleEntry);
    }

    async updateByCycleIdAndProfessorIdAndDayAndHour(
        cycleId: number,
        professorId: number,
        day: number,
        hour: number,
        scheduleEntryUpdateDto: ScheduleEntryUpdateDto
    ): Promise<ScheduleEntry> {
        let existingScheduleEntry = await this.scheduleEntryRepository.findOne({
            where: {
                schedule: {
                    cycle: { id: cycleId },
                    professor: { id: professorId }
                },
                day: day,
                hour: hour
            }
        });

        if (!existingScheduleEntry) {
            throw new EntityNotFoundError('ScheduleEntry not found');
        }

        if (scheduleEntryUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                -1
            );
        }

        if (scheduleEntryUpdateDto.version !== existingScheduleEntry.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                scheduleEntryUpdateDto.version
            );
        }

        if (scheduleEntryUpdateDto.active != null) {
            existingScheduleEntry.active = scheduleEntryUpdateDto.active;
        }

        return await this.scheduleEntryRepository.save(existingScheduleEntry);
    }

    async updateByCycleIdAndClassroomIdAndDayAndHour(
        cycleId: number,
        classroomId: number,
        day: number,
        hour: number,
        scheduleEntryUpdateDto: ScheduleEntryUpdateDto
    ): Promise<ScheduleEntry> {
        const existingScheduleEntry =
            await this.scheduleEntryRepository.findOne({
                where: {
                    schedule: {
                        classroom: { id: classroomId },
                        cycle: { id: cycleId }
                    },
                    day: day,
                    hour: hour
                }
            });

        if (!existingScheduleEntry) {
            throw new EntityNotFoundError('ScheduleEntry not found');
        }

        if (scheduleEntryUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                -1
            );
        }

        if (scheduleEntryUpdateDto.version !== existingScheduleEntry.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleEntry.version,
                scheduleEntryUpdateDto.version
            );
        }

        if (scheduleEntryUpdateDto.active != null) {
            existingScheduleEntry.active = scheduleEntryUpdateDto.active;
        }

        return await this.scheduleEntryRepository.save(existingScheduleEntry);
    }
}
