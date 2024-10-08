import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { GroupInsertDto } from '../dto/GroupInsert.dto';
import { GroupUpdateDto } from '../dto/GroupUpdate.dto';
import { GroupUpdateBulkDto } from '../dto/GroupUpdateBulk.dto';
import { GroupOptionsDto } from '../dto/options/GroupOptions.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { Professor } from '../entities/Professor.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group, 'mySqlConnection')
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>
    ) {}

    async getAll(
        groupOptionsDto: GroupOptionsDto,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<Group>> {
        const [groups, count] = await this.groupRepository.findAndCount({
            relations: {
                course: groupOptionsDto.includeCourse,
                professor: groupOptionsDto.includeProfessor
            },
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(groups, pageMetaDto);
    }

    async getById(
        id: number,
        groupOptionsDto: GroupOptionsDto
    ): Promise<Group> {
        const group = await this.groupRepository.findOne({
            relations: {
                course: groupOptionsDto.includeCourse,
                professor: groupOptionsDto.includeProfessor
            },
            where: { id: id }
        });

        if (!group) {
            throw new EntityNotFoundError('Group not found');
        }

        return group;
    }

    async insert(groupInsertDto: GroupInsertDto): Promise<Group> {
        const course = await this.courseRepository.findOneBy({
            id: groupInsertDto.courseId
        });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        const professor = await this.professorRepository.findOneBy({
            id: groupInsertDto.professorId
        });

        if (!professor) {
            throw new EntityNotFoundError('Professor not found');
        }

        const group = new Group();

        group.group = groupInsertDto.group;
        group.professor = professor;
        group.course = course;

        return await this.groupRepository.save(group);
    }

    async insertMany(groupInsertDtos: GroupInsertDto[]): Promise<Group[]> {
        const groups: Group[] = [];

        for (const groupInsertDto of groupInsertDtos) {
            const course = await this.courseRepository.findOneBy({
                id: groupInsertDto.courseId
            });

            if (!course) {
                throw new EntityNotFoundError('Course not found');
            }

            const professor = await this.professorRepository.findOneBy({
                id: groupInsertDto.professorId
            });

            if (!professor) {
                throw new EntityNotFoundError('Professor not found');
            }

            const group = new Group();

            group.group = groupInsertDto.group;
            group.professor = professor;
            group.course = course;

            groups.push(group);
        }

        return await this.groupRepository.save(groups);
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

        if (groupUpdateDto.group != null) {
            existingGroup.group = groupUpdateDto.group;
        }

        if (groupUpdateDto.professorId != null) {
            const professor = await this.professorRepository.findOneBy({
                id: groupUpdateDto.professorId
            });

            if (!professor) {
                throw new EntityNotFoundError('Professor not found');
            }

            existingGroup.professor = professor;
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

    async updateMany(
        groupUpdateBulkDtos: GroupUpdateBulkDto[]
    ): Promise<Group[]> {
        const groups: Group[] = [];

        for (const groupUpdateBulkDto of groupUpdateBulkDtos) {
            const existingGroup = await this.groupRepository.findOneBy({
                id: groupUpdateBulkDto.id
            });

            if (!existingGroup) {
                throw new EntityNotFoundError('Group not found');
            }

            if (groupUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingGroup.version,
                    -1
                );
            }

            if (groupUpdateBulkDto.version !== existingGroup.version) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingGroup.version,
                    groupUpdateBulkDto.version
                );
            }

            if (groupUpdateBulkDto.group != null) {
                existingGroup.group = groupUpdateBulkDto.group;
            }

            if (groupUpdateBulkDto.professorId != null) {
                const professor = await this.professorRepository.findOneBy({
                    id: groupUpdateBulkDto.professorId
                });

                if (!professor) {
                    throw new EntityNotFoundError('Professor not found');
                }

                existingGroup.professor = professor;
            }

            if (groupUpdateBulkDto.courseId != null) {
                const course = await this.courseRepository.findOneBy({
                    id: groupUpdateBulkDto.courseId
                });

                if (!course) {
                    throw new EntityNotFoundError('Course not found');
                }

                existingGroup.course = course;
            }

            groups.push(existingGroup);
        }

        return await this.groupRepository.save(groups);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.groupRepository.delete(id);
    }
}
