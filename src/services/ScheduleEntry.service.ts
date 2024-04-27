import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ScheduleEntryInsertDto } from '../dto/ScheduleEntryInsert.dto';
import { ScheduleEntryUpdateDto } from '../dto/ScheduleEntryUpdate.dto';
import { Cycle } from '../entities/Cycle.entity';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleEntry } from '../entities/ScheduleEntry.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { IdenticalEntityError } from '../errors/IdenticalEntityError';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ScheduleEntryService {
    constructor(
        @InjectRepository(ScheduleEntry, 'mySqlConnection')
        private readonly scheduleEntryRepository: Repository<ScheduleEntry>,
        @InjectRepository(Schedule, 'mySqlConnection')
        private readonly scheduleRepository: Repository<Schedule>
    ) {}

    async getAll(): Promise<ScheduleEntry[]> {
        return await this.scheduleEntryRepository.find();
    }

    async getAllByProfessorIdAndCycleId(
        professorId: number,
        cycleId: number
    ): Promise<ScheduleEntry[]> {
        return await this.scheduleEntryRepository.find({
            where: {
                schedule: {
                    professor: { id: professorId },
                    cycle: { id: cycleId }
                }
            }
        });
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

    async insert(
        scheduleEntryInsertDto: ScheduleEntryInsertDto
    ): Promise<ScheduleEntry> {
        const scheduleEntry = new ScheduleEntry();

        let schedule: Schedule | null;
        let existingScheduleEntry: ScheduleEntry | null;

        if (scheduleEntryInsertDto.professorId != null) {
            schedule = await this.scheduleRepository.findOne({
                where: {
                    professor: { id: scheduleEntryInsertDto.professorId },
                    cycle: { id: scheduleEntryInsertDto.cycleId }
                }
            });

            existingScheduleEntry = await this.scheduleEntryRepository.findOne({
                where: {
                    schedule: {
                        professor: { id: scheduleEntryInsertDto.professorId },
                        cycle: { id: scheduleEntryInsertDto.cycleId }
                    },
                    day: scheduleEntryInsertDto.day,
                    hour: scheduleEntryInsertDto.hour
                }
            });
        } else if (scheduleEntryInsertDto.classroomId != null) {
            schedule = await this.scheduleRepository.findOne({
                where: {
                    classroom: { id: scheduleEntryInsertDto.classroomId },
                    cycle: { id: scheduleEntryInsertDto.cycleId }
                }
            });

            existingScheduleEntry = await this.scheduleEntryRepository.findOne({
                where: {
                    schedule: {
                        classroom: { id: scheduleEntryInsertDto.classroomId },
                        cycle: { id: scheduleEntryInsertDto.cycleId }
                    },
                    day: scheduleEntryInsertDto.day,
                    hour: scheduleEntryInsertDto.hour
                }
            });
        } else {
            throw new MethodArgumentNotValidError(
                'Professor or Classroom not specified'
            );
        }

        if (!schedule) {
            throw new EntityNotFoundError('Schedule does not exist');
        }

        if (existingScheduleEntry) {
            throw new IdenticalEntityError('ScheduleEntry already exists');
        }

        scheduleEntry.day = scheduleEntryInsertDto.day;
        scheduleEntry.hour = scheduleEntryInsertDto.hour;
        scheduleEntry.active = scheduleEntryInsertDto.active;

        scheduleEntry.schedule = schedule;

        return await this.scheduleEntryRepository.save(scheduleEntry);
    }

    async update(
        scheduleEntryUpdateDto: ScheduleEntryUpdateDto
    ): Promise<ScheduleEntry> {
        let existingScheduleEntry: ScheduleEntry | null;

        if (scheduleEntryUpdateDto.professorId != null) {
            existingScheduleEntry = await this.scheduleEntryRepository.findOne({
                where: {
                    schedule: {
                        professor: { id: scheduleEntryUpdateDto.professorId },
                        cycle: { id: scheduleEntryUpdateDto.cycleId }
                    },
                    day: scheduleEntryUpdateDto.day,
                    hour: scheduleEntryUpdateDto.hour
                }
            });
        } else if (scheduleEntryUpdateDto.classroomId != null) {
            existingScheduleEntry = await this.scheduleEntryRepository.findOne({
                where: {
                    schedule: {
                        classroom: { id: scheduleEntryUpdateDto.classroomId },
                        cycle: { id: scheduleEntryUpdateDto.cycleId }
                    },
                    day: scheduleEntryUpdateDto.day,
                    hour: scheduleEntryUpdateDto.hour
                }
            });
        } else {
            throw new MethodArgumentNotValidError(
                'Professor or Classroom not specified'
            );
        }

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
