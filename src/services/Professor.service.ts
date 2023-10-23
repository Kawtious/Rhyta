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
import { ProfessorModel } from '../models/Professor.model';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { professorRepository } from '../repositories/Professor.repository';
import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessorService {
    async getAll(): Promise<ProfessorModel[]> {
        return await professorRepository.find();
    }

    async getById(id: number): Promise<ProfessorModel> {
        const professor = await professorRepository.findOneBy({ id: id });

        if (!professor) {
            throw new EntityNotFoundError('ProfessorModel not found');
        }

        return professor;
    }

    async insert(firstName: string, lastName: string): Promise<ProfessorModel> {
        const professor = new ProfessorModel();
        professor.firstName = firstName;
        professor.lastName = lastName;

        return await professorRepository.save(professor);
    }

    async update(
        id: number,
        firstName: string,
        lastName: string
    ): Promise<ProfessorModel> {
        const existingProfessor = await professorRepository.findOneBy({
            id: id
        });

        if (!existingProfessor) {
            throw new EntityNotFoundError('ProfessorModel not found');
        }

        existingProfessor.firstName = firstName;
        existingProfessor.lastName = lastName;

        return await professorRepository.save(existingProfessor);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await professorRepository.delete(id);
    }
}
