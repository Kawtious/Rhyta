import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CareerInsertDto } from '../dto/CareerInsert.dto';
import { CareerUpdateDto } from '../dto/CareerUpdate.dto';
import { CareerUpdateBulkDto } from '../dto/CareerUpdateBulk.dto';
import { Career } from '../entities/Career.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class CareerService {
    constructor(
        @InjectRepository(Career, 'mySqlConnection')
        private readonly careerRepository: Repository<Career>
    ) {}

    async getAll(): Promise<Career[]> {
        return await this.careerRepository.find();
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

        career.careerKey = careerInsertDto.careerKey;
        career.pathStartKey = careerInsertDto.pathStartKey;
        career.pathEndKey = careerInsertDto.pathEndKey;

        return await this.careerRepository.save(career);
    }

    async insertBulk(careerInsertDtos: CareerInsertDto[]): Promise<Career[]> {
        const careers: Career[] = [];

        for (const careerInsertDto of careerInsertDtos) {
            const career = new Career();

            career.careerKey = careerInsertDto.careerKey;
            career.pathStartKey = careerInsertDto.pathStartKey;
            career.pathEndKey = careerInsertDto.pathEndKey;

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

        if (careerUpdateDto.careerKey != null) {
            existingCareer.careerKey = careerUpdateDto.careerKey;
        }

        if (careerUpdateDto.pathStartKey != null) {
            existingCareer.pathStartKey = careerUpdateDto.pathStartKey;
        }

        if (careerUpdateDto.pathEndKey != null) {
            existingCareer.pathEndKey = careerUpdateDto.pathEndKey;
        }

        return await this.careerRepository.save(existingCareer);
    }

    async updateBulk(
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

            if (careerUpdateBulkDto.careerKey != null) {
                existingCareer.careerKey = careerUpdateBulkDto.careerKey;
            }

            if (careerUpdateBulkDto.pathStartKey != null) {
                existingCareer.pathStartKey = careerUpdateBulkDto.pathStartKey;
            }

            if (careerUpdateBulkDto.pathEndKey != null) {
                existingCareer.pathEndKey = careerUpdateBulkDto.pathEndKey;
            }

            careers.push(existingCareer);
        }

        return await this.careerRepository.save(careers);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.careerRepository.delete(id);
    }
}
