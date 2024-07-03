import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CareerInsertDto } from '../dto/CareerInsert.dto';
import { CareerUpdateDto } from '../dto/CareerUpdate.dto';
import { CareerUpdateBulkDto } from '../dto/CareerUpdateBulk.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Career } from '../entities/Career.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(Career, 'mySqlConnection')
        private readonly careerRepository: Repository<Career>
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Career>> {
        const [careers, count] = await this.careerRepository.findAndCount({
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(careers, pageMetaDto);
    }

    async getById(id: number): Promise<Career> {
        const career = await this.careerRepository.findOneBy({ id: id });

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        return career;
    }

    async insert(careerInsertDto: CareerInsertDto): Promise<Career> {
        const career = new Career();

        career.key = careerInsertDto.career;

        return await this.careerRepository.save(career);
    }

    async insertMany(careerInsertDtos: CareerInsertDto[]): Promise<Career[]> {
        const careers: Career[] = [];

        for (const careerInsertDto of careerInsertDtos) {
            const career = new Career();

            career.key = careerInsertDto.career;

            careers.push(career);
        }

        return await this.careerRepository.save(careers);
    }

    async update(
        id: number,
        careerUpdateDto: CareerUpdateDto
    ): Promise<Career> {
        const existingCareer = await this.careerRepository.findOneBy({
            id: id
        });

        if (!existingCareer) {
            throw new EntityNotFoundError('Career not found');
        }

        if (careerUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCareer.version,
                -1
            );
        }

        if (careerUpdateDto.version !== existingCareer.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCareer.version,
                careerUpdateDto.version
            );
        }

        if (careerUpdateDto.career != null) {
            existingCareer.key = careerUpdateDto.career;
        }

        return await this.careerRepository.save(existingCareer);
    }

    async updateMany(
        careerUpdateBulkDtos: CareerUpdateBulkDto[]
    ): Promise<Career[]> {
        const careers: Career[] = [];

        for (const careerUpdateBulkDto of careerUpdateBulkDtos) {
            const existingCareer = await this.careerRepository.findOneBy({
                id: careerUpdateBulkDto.id
            });

            if (!existingCareer) {
                throw new EntityNotFoundError('Career not found');
            }

            if (careerUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingCareer.version,
                    -1
                );
            }

            if (careerUpdateBulkDto.version !== existingCareer.version) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingCareer.version,
                    careerUpdateBulkDto.version
                );
            }

            if (careerUpdateBulkDto.career != null) {
                existingCareer.key = careerUpdateBulkDto.career;
            }

            careers.push(existingCareer);
        }

        return await this.careerRepository.save(careers);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.careerRepository.delete(id);
    }
}
