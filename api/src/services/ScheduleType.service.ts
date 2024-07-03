import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ScheduleTypeInsertDto } from '../dto/ScheduleTypeInsert.dto';
import { ScheduleTypeUpdateDto } from '../dto/ScheduleTypeUpdate.dto';
import { ScheduleTypeUpdateBulkDto } from '../dto/ScheduleTypeUpdateBulk.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ScheduleType } from '../entities/ScheduleType.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class ScheduleTypeService {
    constructor(
        @InjectRepository(ScheduleType, 'mySqlConnection')
        private readonly scheduleTypeRepository: Repository<ScheduleType>
    ) {}

    async getAll(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<ScheduleType>> {
        const [scheduleTypes, count] =
            await this.scheduleTypeRepository.findAndCount({
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(scheduleTypes, pageMetaDto);
    }

    async getById(id: number): Promise<ScheduleType> {
        const scheduleType = await this.scheduleTypeRepository.findOneBy({
            id: id
        });

        if (!scheduleType) {
            throw new EntityNotFoundError('ScheduleType not found');
        }

        return scheduleType;
    }

    async insert(
        scheduleTypeInsertDto: ScheduleTypeInsertDto
    ): Promise<ScheduleType> {
        const scheduleType = new ScheduleType();

        scheduleType.description = scheduleTypeInsertDto.description;
        scheduleType.availableHours = scheduleTypeInsertDto.availableHours;
        scheduleType.sessionMask = scheduleTypeInsertDto.sessionMask;

        return await this.scheduleTypeRepository.save(scheduleType);
    }

    async insertMany(
        scheduleTypeInsertDtos: ScheduleTypeInsertDto[]
    ): Promise<ScheduleType[]> {
        const scheduleTypes: ScheduleType[] = [];

        for (const scheduleTypeInsertDto of scheduleTypeInsertDtos) {
            const scheduleType = new ScheduleType();

            scheduleType.description = scheduleTypeInsertDto.description;
            scheduleType.availableHours = scheduleTypeInsertDto.availableHours;
            scheduleType.sessionMask = scheduleTypeInsertDto.sessionMask;

            scheduleTypes.push(scheduleType);
        }

        return await this.scheduleTypeRepository.save(scheduleTypes);
    }

    async update(
        id: number,
        scheduleTypeUpdateDto: ScheduleTypeUpdateDto
    ): Promise<ScheduleType> {
        const existingScheduleType =
            await this.scheduleTypeRepository.findOneBy({
                id: id
            });

        if (!existingScheduleType) {
            throw new EntityNotFoundError('ScheduleType not found');
        }

        if (scheduleTypeUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleType.version,
                -1
            );
        }

        if (scheduleTypeUpdateDto.version !== existingScheduleType.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingScheduleType.version,
                scheduleTypeUpdateDto.version
            );
        }

        if (scheduleTypeUpdateDto.description != null) {
            existingScheduleType.description =
                scheduleTypeUpdateDto.description;
        }

        if (scheduleTypeUpdateDto.availableHours != null) {
            existingScheduleType.availableHours =
                scheduleTypeUpdateDto.availableHours;
        }

        if (scheduleTypeUpdateDto.sessionMask != null) {
            existingScheduleType.sessionMask =
                scheduleTypeUpdateDto.sessionMask;
        }

        return await this.scheduleTypeRepository.save(existingScheduleType);
    }

    async updateMany(
        scheduleTypeUpdateBulkDtos: ScheduleTypeUpdateBulkDto[]
    ): Promise<ScheduleType[]> {
        const scheduleTypes: ScheduleType[] = [];

        for (const scheduleTypeUpdateBulkDto of scheduleTypeUpdateBulkDtos) {
            const existingScheduleType =
                await this.scheduleTypeRepository.findOneBy({
                    id: scheduleTypeUpdateBulkDto.id
                });

            if (!existingScheduleType) {
                throw new EntityNotFoundError('ScheduleType not found');
            }

            if (scheduleTypeUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingScheduleType.version,
                    -1
                );
            }

            if (
                scheduleTypeUpdateBulkDto.version !==
                existingScheduleType.version
            ) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingScheduleType.version,
                    scheduleTypeUpdateBulkDto.version
                );
            }

            if (scheduleTypeUpdateBulkDto.description != null) {
                existingScheduleType.description =
                    scheduleTypeUpdateBulkDto.description;
            }

            if (scheduleTypeUpdateBulkDto.availableHours != null) {
                existingScheduleType.availableHours =
                    scheduleTypeUpdateBulkDto.availableHours;
            }

            if (scheduleTypeUpdateBulkDto.sessionMask != null) {
                existingScheduleType.sessionMask =
                    scheduleTypeUpdateBulkDto.sessionMask;
            }

            scheduleTypes.push(existingScheduleType);
        }

        return await this.scheduleTypeRepository.save(scheduleTypes);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.scheduleTypeRepository.delete(id);
    }
}
