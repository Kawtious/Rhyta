import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { GroupInsertDto } from '../dto/GroupInsert.dto';
import { GroupUpdateDto } from '../dto/GroupUpdate.dto';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group, 'mySqlConnection')
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>
    ) {}

    async getAll(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async getById(id: number): Promise<Group> {
        const group = await this.groupRepository.findOneBy({ id: id });

        if (!group) {
            throw new EntityNotFoundError('Group not found');
        }

        return group;
    }

    async insert(groupInsertDto: GroupInsertDto): Promise<Group> {
        const group = new Group();

        group.firstNumberKey = groupInsertDto.firstNumberKey;
        group.secondNumberKey = groupInsertDto.secondNumberKey;

        const course = await this.courseRepository.findOneBy({
            id: groupInsertDto.courseId
        });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        group.course = course;

        return await this.groupRepository.save(group);
    }

    async update(id: number, groupUpdateDto: GroupUpdateDto): Promise<Group> {
        const existingGroup = await this.groupRepository.findOneBy({
            id: id
        });

        if (!existingGroup) {
            throw new EntityNotFoundError('Group not found');
        }

        if (groupUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingGroup.version,
                -1
            );
        }

        if (groupUpdateDto.version !== existingGroup.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingGroup.version,
                groupUpdateDto.version
            );
        }

        if (groupUpdateDto.firstNumberKey != null) {
            existingGroup.firstNumberKey = groupUpdateDto.firstNumberKey;
        }

        if (groupUpdateDto.secondNumberKey != null) {
            existingGroup.secondNumberKey = groupUpdateDto.secondNumberKey;
        }

        if (groupUpdateDto.courseId != null) {
            const course = await this.courseRepository.findOneBy({
                id: groupUpdateDto.courseId
            });

            if (!course) {
                throw new EntityNotFoundError('Course not found');
            }

            existingGroup.course = course;
        }

        return await this.groupRepository.save(existingGroup);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.groupRepository.delete(id);
    }
}
