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
import { ProfessorEventModel } from '../models/ProfessorEvent.model';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { professorEventRepository } from '../repositories/ProfessorEvent.repository';
import { DeleteResult } from 'typeorm';
import { professorRepository } from '../repositories/Professor.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessorEventService {
    async getAllByProfessorId(
        professorId: number
    ): Promise<ProfessorEventModel[]> {
        return await professorEventRepository.findBy({
            professor: { id: professorId }
        });
    }

    async getByProfessorId(
        professorId: number,
        eventId: number
    ): Promise<ProfessorEventModel> {
        const professorEvent = await professorEventRepository.findOneBy({
            id: eventId,
            professor: { id: professorId }
        });

        if (!professorEvent) {
            throw new EntityNotFoundError('ProfessorModel event not found');
        }

        return professorEvent;
    }

    async insertByProfessorId(
        professorId: number,
        title: string,
        description: string,
        startDate: Date,
        endDate: Date
    ): Promise<ProfessorEventModel> {
        const existingProfessor = await professorRepository.findOneBy({
            id: professorId
        });

        if (!existingProfessor) {
            throw new EntityNotFoundError('ProfessorModel not found');
        }

        const professorEvent = new ProfessorEventModel();

        professorEvent.title = title;
        professorEvent.description = description;
        professorEvent.startDate = startDate;
        professorEvent.endDate = endDate;
        professorEvent.professor = existingProfessor;

        return await professorEventRepository.save(professorEvent);
    }

    async updateByProfessorId(
        professorId: number,
        eventId: number,
        title: string,
        description: string,
        startDate: Date,
        endDate: Date
    ): Promise<ProfessorEventModel> {
        const existingProfessorEvent = await professorEventRepository.findOneBy(
            { id: eventId, professor: { id: professorId } }
        );

        if (!existingProfessorEvent) {
            throw new EntityNotFoundError('ProfessorModel event not found');
        }

        existingProfessorEvent.title = title;
        existingProfessorEvent.description = description;
        existingProfessorEvent.startDate = startDate;
        existingProfessorEvent.endDate = endDate;

        return await professorEventRepository.save(existingProfessorEvent);
    }

    async deleteByProfessorId(
        professorId: number,
        eventId: number
    ): Promise<DeleteResult> {
        return await professorEventRepository.delete({
            id: eventId,
            professor: { id: professorId }
        });
    }
}
