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
