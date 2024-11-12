import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ScheduleInsertDto } from '../dto/ScheduleInsert.dto';
import { ScheduleUpdateDto } from '../dto/ScheduleUpdate.dto';
import { ScheduleOptionsDto } from '../dto/options/ScheduleOptions.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleType } from '../entities/ScheduleType.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule, 'mySqlConnection')
        private readonly scheduleRepository: Repository<Schedule>,
        @InjectRepository(ScheduleType, 'mySqlConnection')
        private readonly scheduleTypeRepository: Repository<ScheduleType>
    ) {}

    async search(
        scheduleOptionsDto: ScheduleOptionsDto,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<Schedule>> {
        const [schedules, count] = await this.scheduleRepository.findAndCount({
            relations: {
                scheduleType: scheduleOptionsDto.includeScheduleType
            },
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(schedules, pageMetaDto);
    }

    async searchById(
        id: number,
        scheduleOptionsDto: ScheduleOptionsDto
    ): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({
            relations: {
                scheduleType: scheduleOptionsDto.includeScheduleType
            },
            where: { id: id }
        });

        if (!schedule) {
            throw new EntityNotFoundError('Schedule not found');
        }

        return schedule;
    }

    async insert(scheduleInsertDto: ScheduleInsertDto): Promise<Schedule> {
        const scheduleType = await this.scheduleTypeRepository.findOneBy({
            id: scheduleInsertDto.scheduleTypeId
        });

        if (!scheduleType) {
            throw new EntityNotFoundError('ScheduleType not found');
        }

        const schedule = new Schedule();

        schedule.type = scheduleInsertDto.type;
        schedule.offset = scheduleInsertDto.offset;
        schedule.scheduleType = scheduleType;

        return await this.scheduleRepository.save(schedule);
    }

    async insertMany(
        scheduleInsertDtos: ScheduleInsertDto[]
    ): Promise<Schedule[]> {
        const schedules: Schedule[] = [];

        for (const scheduleInsertDto of scheduleInsertDtos) {
            const scheduleType = await this.scheduleTypeRepository.findOneBy({
                id: scheduleInsertDto.scheduleTypeId
            });

            if (!scheduleType) {
                throw new EntityNotFoundError('ScheduleType not found');
            }

            const schedule = new Schedule();

            schedule.type = scheduleInsertDto.type;
            schedule.offset = scheduleInsertDto.offset;
            schedule.scheduleType = scheduleType;

            schedules.push(schedule);
        }

        return await this.scheduleRepository.save(schedules);
    }

    async updateById(
        id: number,
        scheduleUpdateDto: ScheduleUpdateDto
    ): Promise<Schedule> {
        const existingSchedule = await this.scheduleRepository.findOneBy({
            id: id
        });

        if (!existingSchedule) {
            throw new EntityNotFoundError('Schedule not found');
        }

        if (scheduleUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                -1
            );
        }

        if (scheduleUpdateDto.version !== existingSchedule.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                scheduleUpdateDto.version
            );
        }

        if (scheduleUpdateDto.type != null) {
            existingSchedule.type = scheduleUpdateDto.type;
        }

        if (scheduleUpdateDto.offset != null) {
            existingSchedule.offset = scheduleUpdateDto.offset;
        }

        if (scheduleUpdateDto.scheduleTypeId != null) {
            const scheduleType = await this.scheduleTypeRepository.findOneBy({
                id: scheduleUpdateDto.scheduleTypeId
            });

            if (!scheduleType) {
                throw new EntityNotFoundError('ScheduleType not found');
            }

            existingSchedule.scheduleType = scheduleType;
        }

        return await this.scheduleRepository.save(existingSchedule);
    }

    async updateMany(
        scheduleUpdateDtos: ScheduleUpdateDto[]
    ): Promise<Schedule[]> {
        const schedules: Schedule[] = [];

        for (const scheduleUpdateDto of scheduleUpdateDtos) {
            const existingSchedule = await this.scheduleRepository.findOneBy({
                id: scheduleUpdateDto.id
            });

            if (!existingSchedule) {
                throw new EntityNotFoundError('Schedule not found');
            }

            if (scheduleUpdateDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingSchedule.version,
                    -1
                );
            }

            if (scheduleUpdateDto.version !== existingSchedule.version) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingSchedule.version,
                    scheduleUpdateDto.version
                );
            }

            if (scheduleUpdateDto.type != null) {
                existingSchedule.type = scheduleUpdateDto.type;
            }

            if (scheduleUpdateDto.offset != null) {
                existingSchedule.offset = scheduleUpdateDto.offset;
            }

            if (scheduleUpdateDto.scheduleTypeId != null) {
                const scheduleType =
                    await this.scheduleTypeRepository.findOneBy({
                        id: scheduleUpdateDto.scheduleTypeId
                    });

                if (!scheduleType) {
                    throw new EntityNotFoundError('ScheduleType not found');
                }

                existingSchedule.scheduleType = scheduleType;
            }

            schedules.push(existingSchedule);
        }

        return await this.scheduleRepository.save(schedules);
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return await this.scheduleRepository.delete(id);
    }
}
