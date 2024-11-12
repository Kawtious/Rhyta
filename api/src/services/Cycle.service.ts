import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CycleInsertDto } from '../dto/CycleInsert.dto';
import { CycleUpdateDto } from '../dto/CycleUpdate.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Cycle } from '../entities/Cycle.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class CycleService {
    constructor(
        @InjectRepository(Cycle, 'mySqlConnection')
        private readonly cycleRepository: Repository<Cycle>
    ) {}

    async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<Cycle>> {
        const [cycles, count] = await this.cycleRepository.findAndCount({
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(cycles, pageMetaDto);
    }

    async searchById(id: number): Promise<Cycle> {
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

    async updateById(
        id: number,
        cycleUpdateDto: CycleUpdateDto
    ): Promise<Cycle> {
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

    async updateMany(cycleUpdateDtos: CycleUpdateDto[]): Promise<Cycle[]> {
        const cycles: Cycle[] = [];

        for (const cycleUpdateDto of cycleUpdateDtos) {
            const existingCycle = await this.cycleRepository.findOneBy({
                id: cycleUpdateDto.id
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

            cycles.push(existingCycle);
        }

        return await this.cycleRepository.save(cycles);
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return await this.cycleRepository.delete(id);
    }
}
