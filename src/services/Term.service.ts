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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { TermDto } from '../dto/Term.dto';
import { Term } from '../entities/Term.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class TermService {
    constructor(
        @InjectRepository(Term, 'mySqlConnection')
        private readonly termRepository: Repository<Term>
    ) {}

    async getAll(): Promise<Term[]> {
        return await this.termRepository.find();
    }

    async count(): Promise<number> {
        return await this.termRepository.count();
    }

    async getById(id: number): Promise<Term> {
        const term = await this.termRepository.findOneBy({ id: id });

        if (!term) {
            throw new EntityNotFoundError('Term not found');
        }

        return term;
    }

    async insert(termDto: TermDto): Promise<Term> {
        const term = new Term();

        term.title = termDto.title;

        if (termDto.description != null) {
            term.description = termDto.description;
        }

        term.startDate = termDto.startDate;
        term.endDate = termDto.endDate;

        return await this.termRepository.save(term);
    }

    async update(id: number, termDto: TermDto): Promise<Term> {
        const existingTerm = await this.termRepository.findOneBy({ id: id });

        if (!existingTerm) {
            throw new EntityNotFoundError('Term not found');
        }

        if (termDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingTerm.version,
                -1
            );
        }

        if (termDto.version !== existingTerm.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingTerm.version,
                termDto.version
            );
        }

        existingTerm.title = termDto.title;

        if (termDto.description != null) {
            existingTerm.description = termDto.description;
        }

        existingTerm.startDate = termDto.startDate;
        existingTerm.endDate = termDto.endDate;

        return await this.termRepository.save(existingTerm);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.termRepository.delete(id);
    }
}
