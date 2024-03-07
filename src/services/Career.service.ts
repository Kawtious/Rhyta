import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CareerInsertDto } from '../dto/CareerInsert.dto';
import { CareerUpdateDto } from '../dto/CareerUpdate.dto';
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

    async delete(id: number): Promise<DeleteResult> {
        return await this.careerRepository.delete(id);
    }
}
