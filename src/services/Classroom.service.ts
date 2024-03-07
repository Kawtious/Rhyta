import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ClassroomInsertDto } from '../dto/ClassroomInsert.dto';
import { ClassroomUpdateDto } from '../dto/ClassroomUpdate.dto';
import { Classroom } from '../entities/Classroom.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ClassroomService {
    constructor(
        @InjectRepository(Classroom, 'mySqlConnection')
        private readonly classroomRepository: Repository<Classroom>
    ) {}

    async getAll(): Promise<Classroom[]> {
        return await this.classroomRepository.find();
    }

    async getById(id: number): Promise<Classroom> {
        const classroom = await this.classroomRepository.findOneBy({ id: id });

        if (!classroom) {
            throw new EntityNotFoundError('Classroom not found');
        }

        return classroom;
    }

    async insert(classroomInsertDto: ClassroomInsertDto): Promise<Classroom> {
        const classroom = new Classroom();

        classroom.typeKey = classroomInsertDto.typeKey;

        return await this.classroomRepository.save(classroom);
    }

    async update(
        id: number,
        classroomUpdateDto: ClassroomUpdateDto
    ): Promise<Classroom> {
        const existingClassroom = await this.classroomRepository.findOneBy({
            id: id
        });

        if (!existingClassroom) {
            throw new EntityNotFoundError('Classroom not found');
        }

        if (classroomUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingClassroom.version,
                -1
            );
        }

        if (classroomUpdateDto.version !== existingClassroom.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingClassroom.version,
                classroomUpdateDto.version
            );
        }

        if (classroomUpdateDto.typeKey != null) {
            existingClassroom.typeKey = classroomUpdateDto.typeKey;
        }

        return await this.classroomRepository.save(existingClassroom);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.classroomRepository.delete(id);
    }
}
