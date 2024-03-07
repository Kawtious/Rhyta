import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProfessorInsertDto } from '../dto/ProfessorInsert.dto';
import { ProfessorUpdateDto } from '../dto/ProfessorUpdate.dto';
import { Professor } from '../entities/Professor.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>
    ) {}

    async getAll(): Promise<Professor[]> {
        return await this.professorRepository.find();
    }

    async count(): Promise<number> {
        return await this.professorRepository.count();
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

        professor.typeKey = professorInsertDto.typeKey;
        professor.controlNumberKey = professorInsertDto.controlNumberKey;
        professor.name = professorInsertDto.name;

        return await this.professorRepository.save(professor);
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

        if (professorUpdateDto.typeKey != null) {
            existingProfessor.typeKey = professorUpdateDto.typeKey;
        }

        if (professorUpdateDto.controlNumberKey != null) {
            existingProfessor.controlNumberKey =
                professorUpdateDto.controlNumberKey;
        }

        if (professorUpdateDto.name != null) {
            existingProfessor.name = professorUpdateDto.name;
        }

        return await this.professorRepository.save(existingProfessor);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.professorRepository.delete(id);
    }
}
