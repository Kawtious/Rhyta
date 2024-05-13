import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProgramTypeInsertDto } from '../dto/ProgramTypeInsert.dto';
import { ProgramTypeUpdateDto } from '../dto/ProgramTypeUpdate.dto';
import { ProgramTypeUpdateBulkDto } from '../dto/ProgramTypeUpdateBulk.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ProgramType } from '../entities/ProgramType.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ProgramTypeService {
    constructor(
        @InjectRepository(ProgramType, 'mySqlConnection')
        private readonly programTypeRepository: Repository<ProgramType>
    ) {}

    async getAll(
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<ProgramType>> {
        const [programTypes, count] =
            await this.programTypeRepository.findAndCount({
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(programTypes, pageMetaDto);
    }

    async getById(id: number): Promise<ProgramType> {
        const programType = await this.programTypeRepository.findOneBy({
            id: id
        });

        if (!programType) {
            throw new EntityNotFoundError('ProgramType not found');
        }

        return programType;
    }

    async insert(
        programTypeInsertDto: ProgramTypeInsertDto
    ): Promise<ProgramType> {
        const programType = new ProgramType();

        programType.descriptionKey = programTypeInsertDto.descriptionKey;
        programType.availableHoursKey = programTypeInsertDto.availableHoursKey;
        programType.sessionMaskKey = programTypeInsertDto.sessionMaskKey;

        return await this.programTypeRepository.save(programType);
    }

    async insertMany(
        programTypeInsertDtos: ProgramTypeInsertDto[]
    ): Promise<ProgramType[]> {
        const programTypes: ProgramType[] = [];

        for (const programTypeInsertDto of programTypeInsertDtos) {
            const programType = new ProgramType();

            programType.descriptionKey = programTypeInsertDto.descriptionKey;
            programType.availableHoursKey =
                programTypeInsertDto.availableHoursKey;
            programType.sessionMaskKey = programTypeInsertDto.sessionMaskKey;

            programTypes.push(programType);
        }

        return await this.programTypeRepository.save(programTypes);
    }

    async update(
        id: number,
        programTypeUpdateDto: ProgramTypeUpdateDto
    ): Promise<ProgramType> {
        const existingProgramType = await this.programTypeRepository.findOneBy({
            id: id
        });

        if (!existingProgramType) {
            throw new EntityNotFoundError('ProgramType not found');
        }

        if (programTypeUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProgramType.version,
                -1
            );
        }

        if (programTypeUpdateDto.version !== existingProgramType.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProgramType.version,
                programTypeUpdateDto.version
            );
        }

        if (programTypeUpdateDto.descriptionKey != null) {
            existingProgramType.descriptionKey =
                programTypeUpdateDto.descriptionKey;
        }

        if (programTypeUpdateDto.availableHoursKey != null) {
            existingProgramType.availableHoursKey =
                programTypeUpdateDto.availableHoursKey;
        }

        if (programTypeUpdateDto.sessionMaskKey != null) {
            existingProgramType.sessionMaskKey =
                programTypeUpdateDto.sessionMaskKey;
        }

        return await this.programTypeRepository.save(existingProgramType);
    }

    async updateMany(
        programTypeUpdateBulkDtos: ProgramTypeUpdateBulkDto[]
    ): Promise<ProgramType[]> {
        const programTypes: ProgramType[] = [];

        for (const programTypeUpdateBulkDto of programTypeUpdateBulkDtos) {
            const existingProgramType =
                await this.programTypeRepository.findOneBy({
                    id: programTypeUpdateBulkDto.id
                });

            if (!existingProgramType) {
                throw new EntityNotFoundError('ProgramType not found');
            }

            if (programTypeUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingProgramType.version,
                    -1
                );
            }

            if (
                programTypeUpdateBulkDto.version !== existingProgramType.version
            ) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingProgramType.version,
                    programTypeUpdateBulkDto.version
                );
            }

            if (programTypeUpdateBulkDto.descriptionKey != null) {
                existingProgramType.descriptionKey =
                    programTypeUpdateBulkDto.descriptionKey;
            }

            if (programTypeUpdateBulkDto.availableHoursKey != null) {
                existingProgramType.availableHoursKey =
                    programTypeUpdateBulkDto.availableHoursKey;
            }

            if (programTypeUpdateBulkDto.sessionMaskKey != null) {
                existingProgramType.sessionMaskKey =
                    programTypeUpdateBulkDto.sessionMaskKey;
            }

            programTypes.push(existingProgramType);
        }

        return await this.programTypeRepository.save(programTypes);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.programTypeRepository.delete(id);
    }
}
