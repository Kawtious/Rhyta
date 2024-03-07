import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProgramTypeInsertDto } from '../dto/ProgramTypeInsert.dto';
import { ProgramTypeUpdateDto } from '../dto/ProgramTypeUpdate.dto';
import { ProgramType } from '../entities/ProgramType.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ProgramTypeService {
    constructor(
        @InjectRepository(ProgramType, 'mySqlConnection')
        private readonly programTypeRepository: Repository<ProgramType>
    ) {}

    async getAll(): Promise<ProgramType[]> {
        return await this.programTypeRepository.find();
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

    async delete(id: number): Promise<DeleteResult> {
        return await this.programTypeRepository.delete(id);
    }
}
