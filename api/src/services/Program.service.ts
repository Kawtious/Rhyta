import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProgramInsertDto } from '../dto/ProgramInsert.dto';
import { ProgramUpdateDto } from '../dto/ProgramUpdate.dto';
import { ProgramUpdateBulkDto } from '../dto/ProgramUpdateBulk.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Program } from '../entities/Program.entity';
import { ProgramType } from '../entities/ProgramType.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ProgramService {
    constructor(
        @InjectRepository(Program, 'mySqlConnection')
        private readonly programRepository: Repository<Program>,
        @InjectRepository(ProgramType, 'mySqlConnection')
        private readonly programTypeRepository: Repository<ProgramType>
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Program>> {
        const [programs, count] = await this.programRepository.findAndCount({
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(programs, pageMetaDto);
    }

    async getById(id: number): Promise<Program> {
        const program = await this.programRepository.findOneBy({ id: id });

        if (!program) {
            throw new EntityNotFoundError('Program not found');
        }

        return program;
    }

    async insert(programInsertDto: ProgramInsertDto): Promise<Program> {
        const program = new Program();

        program.typeKey = programInsertDto.typeKey;
        program.offsetKey = programInsertDto.offsetKey;

        const programType = await this.programTypeRepository.findOneBy({
            id: programInsertDto.programTypeId
        });

        if (!programType) {
            throw new EntityNotFoundError('ProgramType not found');
        }

        program.programType = programType;

        return await this.programRepository.save(program);
    }

    async insertMany(
        programInsertDtos: ProgramInsertDto[]
    ): Promise<Program[]> {
        const programs: Program[] = [];

        for (const programInsertDto of programInsertDtos) {
            const program = new Program();

            program.typeKey = programInsertDto.typeKey;
            program.offsetKey = programInsertDto.offsetKey;

            const programType = await this.programTypeRepository.findOneBy({
                id: programInsertDto.programTypeId
            });

            if (!programType) {
                throw new EntityNotFoundError('ProgramType not found');
            }

            program.programType = programType;

            programs.push(program);
        }

        return await this.programRepository.save(programs);
    }

    async update(
        id: number,
        programUpdateDto: ProgramUpdateDto
    ): Promise<Program> {
        const existingProgram = await this.programRepository.findOneBy({
            id: id
        });

        if (!existingProgram) {
            throw new EntityNotFoundError('Program not found');
        }

        if (programUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProgram.version,
                -1
            );
        }

        if (programUpdateDto.version !== existingProgram.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProgram.version,
                programUpdateDto.version
            );
        }

        if (programUpdateDto.typeKey != null) {
            existingProgram.typeKey = programUpdateDto.typeKey;
        }

        if (programUpdateDto.offsetKey != null) {
            existingProgram.offsetKey = programUpdateDto.offsetKey;
        }

        if (programUpdateDto.programTypeId != null) {
            const programType = await this.programTypeRepository.findOneBy({
                id: programUpdateDto.programTypeId
            });

            if (!programType) {
                throw new EntityNotFoundError('ProgramType not found');
            }

            existingProgram.programType = programType;
        }

        return await this.programRepository.save(existingProgram);
    }

    async updateMany(
        programUpdateBulkDtos: ProgramUpdateBulkDto[]
    ): Promise<Program[]> {
        const programs: Program[] = [];

        for (const programUpdateBulkDto of programUpdateBulkDtos) {
            const existingProgram = await this.programRepository.findOneBy({
                id: programUpdateBulkDto.id
            });

            if (!existingProgram) {
                throw new EntityNotFoundError('Program not found');
            }

            if (programUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingProgram.version,
                    -1
                );
            }

            if (programUpdateBulkDto.version !== existingProgram.version) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingProgram.version,
                    programUpdateBulkDto.version
                );
            }

            if (programUpdateBulkDto.typeKey != null) {
                existingProgram.typeKey = programUpdateBulkDto.typeKey;
            }

            if (programUpdateBulkDto.offsetKey != null) {
                existingProgram.offsetKey = programUpdateBulkDto.offsetKey;
            }

            if (programUpdateBulkDto.programTypeId != null) {
                const programType = await this.programTypeRepository.findOneBy({
                    id: programUpdateBulkDto.programTypeId
                });

                if (!programType) {
                    throw new EntityNotFoundError('ProgramType not found');
                }

                existingProgram.programType = programType;
            }

            programs.push(existingProgram);
        }

        return await this.programRepository.save(programs);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.programRepository.delete(id);
    }
}
