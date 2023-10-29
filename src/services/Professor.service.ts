/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious, Zeferito
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from '../entities/Professor.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { ProfessorDto } from '../dto/Professor.dto';

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>
    ) {}

    async getAll(): Promise<Professor[]> {
        return await this.professorRepository.find();
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

        professor.firstName = professorDto.firstName;

        if (professorDto.lastName != null) {
            professor.lastName = professorDto.lastName;
        }

        return await this.professorRepository.save(professor);
    }

    async update(id: number, professorDto: ProfessorDto): Promise<Professor> {
        const existingProfessor = await this.professorRepository.findOneBy({
            id: id
        });

        if (!existingProfessor) {
            throw new EntityNotFoundError('Professor not found');
        }

        existingProfessor.firstName = professorDto.firstName;

        if (professorDto.lastName != null) {
            existingProfessor.lastName = professorDto.lastName;
        }

        return await this.professorRepository.save(existingProfessor);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.professorRepository.delete(id);
    }
}
