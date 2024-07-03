import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProfessorInsertDto } from '../dto/ProfessorInsert.dto';
import { ProfessorUpdateDto } from '../dto/ProfessorUpdate.dto';
import { ProfessorUpdateBulkDto } from '../dto/ProfessorUpdateBulk.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Professor } from '../entities/Professor.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Professor>> {
        const [professors, count] = await this.professorRepository.findAndCount(
            {
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            }
        );

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(professors, pageMetaDto);
    }

    async getById(id: number): Promise<Professor> {
        const professor = await this.professorRepository.findOneBy({ id: id });

        if (!professor) {
            throw new EntityNotFoundError('Professor not found');
        }

        return professor;
    }

    async insert(professorInsertDto: ProfessorInsertDto): Promise<Professor> {
        const professor = new Professor();

        professor.type = professorInsertDto.type;
        professor.controlNumber = professorInsertDto.controlNumber;
        professor.name = professorInsertDto.name;

        return await this.professorRepository.save(professor);
    }

    async insertMany(
        professorInsertDtos: ProfessorInsertDto[]
    ): Promise<Professor[]> {
        const professors: Professor[] = [];

        for (const professorInsertDto of professorInsertDtos) {
            const professor = new Professor();

            professor.type = professorInsertDto.type;
            professor.controlNumber = professorInsertDto.controlNumber;
            professor.name = professorInsertDto.name;

            professors.push(professor);
        }

        return await this.professorRepository.save(professors);
    }

    async update(
        id: number,
        professorUpdateDto: ProfessorUpdateDto
    ): Promise<Professor> {
        const existingProfessor = await this.professorRepository.findOneBy({
            id: id
        });

        if (!existingProfessor) {
            throw new EntityNotFoundError('Professor not found');
        }

        if (professorUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProfessor.version,
                -1
            );
        }

        if (professorUpdateDto.version !== existingProfessor.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProfessor.version,
                professorUpdateDto.version
            );
        }

        if (professorUpdateDto.type != null) {
            existingProfessor.type = professorUpdateDto.type;
        }

        if (professorUpdateDto.controlNumber != null) {
            existingProfessor.controlNumber = professorUpdateDto.controlNumber;
        }

        if (professorUpdateDto.name != null) {
            existingProfessor.name = professorUpdateDto.name;
        }

        return await this.professorRepository.save(existingProfessor);
    }

    async updateMany(
        professorUpdateBulkDtos: ProfessorUpdateBulkDto[]
    ): Promise<Professor[]> {
        const professors: Professor[] = [];

        for (const professorUpdateBulkDto of professorUpdateBulkDtos) {
            const existingProfessor = await this.professorRepository.findOneBy({
                id: professorUpdateBulkDto.id
            });

            if (!existingProfessor) {
                throw new EntityNotFoundError('Professor not found');
            }

            if (professorUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingProfessor.version,
                    -1
                );
            }

            if (professorUpdateBulkDto.version !== existingProfessor.version) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingProfessor.version,
                    professorUpdateBulkDto.version
                );
            }

            if (professorUpdateBulkDto.type != null) {
                existingProfessor.type = professorUpdateBulkDto.type;
            }

            if (professorUpdateBulkDto.controlNumber != null) {
                existingProfessor.controlNumber =
                    professorUpdateBulkDto.controlNumber;
            }

            if (professorUpdateBulkDto.name != null) {
                existingProfessor.name = professorUpdateBulkDto.name;
            }

            professors.push(existingProfessor);
        }

        return await this.professorRepository.save(professors);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.professorRepository.delete(id);
    }
}
