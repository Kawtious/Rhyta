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
import { TermModel } from '../models/Term.model';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { termRepository } from '../repositories/Term.repository';
import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TermService {
    async getAll(): Promise<TermModel[]> {
        return await termRepository.find();
    }

    async getById(id: number): Promise<TermModel> {
        const term = await termRepository.findOneBy({ id: id });

        if (!term) {
            throw new EntityNotFoundError('TermModel not found');
        }

        return term;
    }

    async insert(
        title: string,
        description: string,
        startDate: Date,
        endDate: Date
    ): Promise<TermModel> {
        const term = new TermModel();
        term.title = title;
        term.description = description;
        term.startDate = startDate;
        term.endDate = endDate;

        return await termRepository.save(term);
    }

    async update(
        id: number,
        title: string,
        description: string,
        startDate: Date,
        endDate: Date
    ): Promise<TermModel> {
        const existingTerm = await termRepository.findOneBy({ id: id });

        if (!existingTerm) {
            throw new EntityNotFoundError('TermModel not found');
        }

        existingTerm.title = title;
        existingTerm.description = description;
        existingTerm.startDate = startDate;
        existingTerm.endDate = endDate;

        return await termRepository.save(existingTerm);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await termRepository.delete(id);
    }
}
