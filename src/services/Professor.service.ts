import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProfessorDto } from '../dto/Professor.dto';
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

    async insert(professorDto: ProfessorDto): Promise<Professor> {
        const professor = new Professor();

        professor.name = professorDto.name;

        return await this.professorRepository.save(professor);
    }

    async update(id: number, professorDto: ProfessorDto): Promise<Professor> {
        const existingProfessor = await this.professorRepository.findOneBy({
            id: id
        });

        if (!existingProfessor) {
            throw new EntityNotFoundError('Professor not found');
        }

        if (professorDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProfessor.version,
                -1
            );
        }

        if (professorDto.version !== existingProfessor.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProfessor.version,
                professorDto.version
            );
        }

        existingProfessor.name = professorDto.name;

        return await this.professorRepository.save(existingProfessor);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.professorRepository.delete(id);
    }
}
