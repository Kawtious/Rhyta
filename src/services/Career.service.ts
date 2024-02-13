import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CareerDto } from '../dto/Career.dto';
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

    async count(): Promise<number> {
        return await this.careerRepository.count();
    }

    async getById(id: number): Promise<Career> {
        const career = await this.careerRepository.findOneBy({ id: id });

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        return career;
    }

    async insert(careerDto: CareerDto): Promise<Career> {
        const career = new Career();

        career.name = careerDto.name;

        if (careerDto.description != null) {
            career.description = careerDto.description;
        }

        return await this.careerRepository.save(career);
    }

    async update(id: number, careerDto: CareerDto): Promise<Career> {
        const existingCareer = await this.careerRepository.findOneBy({
            id: id
        });

        if (!existingCareer) {
            throw new EntityNotFoundError('Career not found');
        }

        if (careerDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCareer.version,
                -1
            );
        }

        if (careerDto.version !== existingCareer.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCareer.version,
                careerDto.version
            );
        }

        existingCareer.name = careerDto.name;

        if (careerDto.description != null) {
            existingCareer.description = careerDto.description;
        }

        return await this.careerRepository.save(existingCareer);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.careerRepository.delete(id);
    }
}
