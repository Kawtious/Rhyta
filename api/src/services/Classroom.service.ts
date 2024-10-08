import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ClassroomInsertDto } from '../dto/ClassroomInsert.dto';
import { ClassroomUpdateDto } from '../dto/ClassroomUpdate.dto';
import { ClassroomUpdateBulkDto } from '../dto/ClassroomUpdateBulk.dto';
import { ClassroomOptionsDto } from '../dto/options/ClassroomOptions.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Classroom } from '../entities/Classroom.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class ClassroomService {
    constructor(
        @InjectRepository(Classroom, 'mySqlConnection')
        private readonly classroomRepository: Repository<Classroom>
    ) {}

    async getAll(
        classroomOptionsDto: ClassroomOptionsDto,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<Classroom>> {
        const [classrooms, count] = await this.classroomRepository.findAndCount(
            {
                relations: {
                    availabilitySchedules:
                        classroomOptionsDto.includeAvailabilitySchedules
                },
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            }
        );

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(classrooms, pageMetaDto);
    }

    async getById(
        id: number,
        classroomOptionsDto: ClassroomOptionsDto
    ): Promise<Classroom> {
        const classroom = await this.classroomRepository.findOne({
            relations: {
                availabilitySchedules:
                    classroomOptionsDto.includeAvailabilitySchedules
            },
            where: { id: id }
        });

        if (!classroom) {
            throw new EntityNotFoundError('Classroom not found');
        }

        return classroom;
    }

    async insert(classroomInsertDto: ClassroomInsertDto): Promise<Classroom> {
        const classroom = new Classroom();

        classroom.type = classroomInsertDto.type;

        return await this.classroomRepository.save(classroom);
    }

    async insertMany(
        classroomInsertDtos: ClassroomInsertDto[]
    ): Promise<Classroom[]> {
        const classrooms: Classroom[] = [];

        for (const classroomInsertDto of classroomInsertDtos) {
            const classroom = new Classroom();

            classroom.type = classroomInsertDto.type;

            classrooms.push(classroom);
        }

        return await this.classroomRepository.save(classrooms);
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

        if (classroomUpdateDto.type != null) {
            existingClassroom.type = classroomUpdateDto.type;
        }

        return await this.classroomRepository.save(existingClassroom);
    }

    async updateMany(
        classroomUpdateBulkDtos: ClassroomUpdateBulkDto[]
    ): Promise<Classroom[]> {
        const classrooms: Classroom[] = [];

        for (const classroomUpdateBulkDto of classroomUpdateBulkDtos) {
            const existingClassroom = await this.classroomRepository.findOneBy({
                id: classroomUpdateBulkDto.id
            });

            if (!existingClassroom) {
                throw new EntityNotFoundError('Classroom not found');
            }

            if (classroomUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingClassroom.version,
                    -1
                );
            }

            if (classroomUpdateBulkDto.version !== existingClassroom.version) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingClassroom.version,
                    classroomUpdateBulkDto.version
                );
            }

            if (classroomUpdateBulkDto.type != null) {
                existingClassroom.type = classroomUpdateBulkDto.type;
            }

            classrooms.push(existingClassroom);
        }

        return await this.classroomRepository.save(classrooms);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.classroomRepository.delete(id);
    }
}
