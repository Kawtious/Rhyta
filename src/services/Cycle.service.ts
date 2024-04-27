import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CycleInsertDto } from '../dto/CycleInsert.dto';
import { CycleUpdateDto } from '../dto/CycleUpdate.dto';
import { Cycle } from '../entities/Cycle.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class CycleService {
    constructor(
        @InjectRepository(Cycle, 'mySqlConnection')
        private readonly cycleRepository: Repository<Cycle>
    ) {}

    async getAll(): Promise<Cycle[]> {
        return await this.cycleRepository.find();
    }

    async getById(id: number): Promise<Cycle> {
        const cycle = await this.cycleRepository.findOneBy({ id: id });

        if (!cycle) {
            throw new EntityNotFoundError('Cycle not found');
        }

        return cycle;
    }

    async insert(cycleInsertDto: CycleInsertDto): Promise<Cycle> {
        const cycle = new Cycle();

        cycle.title = cycleInsertDto.title;

        if (cycleInsertDto.description != null) {
            cycle.description = cycleInsertDto.description;
        }

        return await this.cycleRepository.save(cycle);
    }

    async update(id: number, cycleUpdateDto: CycleUpdateDto): Promise<Cycle> {
        const existingCycle = await this.cycleRepository.findOneBy({
            id: id
        });

        if (!existingCycle) {
            throw new EntityNotFoundError('Cycle not found');
        }

        if (cycleUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCycle.version,
                -1
            );
        }

        if (cycleUpdateDto.version !== existingCycle.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCycle.version,
                cycleUpdateDto.version
            );
        }

        if (cycleUpdateDto.title != null) {
            existingCycle.title = cycleUpdateDto.title;
        }

        if (cycleUpdateDto.description != null) {
            existingCycle.description = cycleUpdateDto.description;
        }

        return await this.cycleRepository.save(existingCycle);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.cycleRepository.delete(id);
    }
}
