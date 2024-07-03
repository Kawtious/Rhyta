import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CourseInsertDto } from '../dto/CourseInsert.dto';
import { CourseUpdateDto } from '../dto/CourseUpdate.dto';
import { CourseUpdateBulkDto } from '../dto/CourseUpdateBulk.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Classroom } from '../entities/Classroom.entity';
import { Course } from '../entities/Course.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Classroom, 'mySqlConnection')
        private readonly classroomRepository: Repository<Classroom>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Course>> {
        const [courses, count] = await this.courseRepository.findAndCount({
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(courses, pageMetaDto);
    }

    async getById(id: number): Promise<Course> {
        const course = await this.courseRepository.findOneBy({ id: id });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        return course;
    }

    async insert(courseInsertDto: CourseInsertDto): Promise<Course> {
        const classroom = await this.classroomRepository.findOneBy({
            id: courseInsertDto.classroomId
        });

        if (!classroom) {
            throw new EntityNotFoundError('Classroom not found');
        }

        const course = new Course();

        course.key = courseInsertDto.key;
        course.schedule = courseInsertDto.schedule;
        course.description = courseInsertDto.description;
        course.classroom = classroom;

        return await this.courseRepository.save(course);
    }

    async insertMany(courseInsertDtos: CourseInsertDto[]): Promise<Course[]> {
        const courses: Course[] = [];

        for (const courseInsertDto of courseInsertDtos) {
            const classroom = await this.classroomRepository.findOneBy({
                id: courseInsertDto.classroomId
            });

            if (!classroom) {
                throw new EntityNotFoundError('Classroom not found');
            }

            const course = new Course();

            course.key = courseInsertDto.key;
            course.schedule = courseInsertDto.schedule;
            course.description = courseInsertDto.description;
            course.classroom = classroom;

            courses.push(course);
        }

        return await this.courseRepository.save(courses);
    }

    async update(
        id: number,
        courseUpdateDto: CourseUpdateDto
    ): Promise<Course> {
        const existingCourse = await this.courseRepository.findOneBy({
            id: id
        });

        if (!existingCourse) {
            throw new EntityNotFoundError('Course not found');
        }

        if (courseUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCourse.version,
                -1
            );
        }

        if (courseUpdateDto.version !== existingCourse.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCourse.version,
                courseUpdateDto.version
            );
        }

        if (courseUpdateDto.key != null) {
            existingCourse.key = courseUpdateDto.key;
        }

        if (courseUpdateDto.classroomId != null) {
            const classroom = await this.classroomRepository.findOneBy({
                id: courseUpdateDto.classroomId
            });

            if (!classroom) {
                throw new EntityNotFoundError('Classroom not found');
            }

            existingCourse.classroom = classroom;
        }

        if (courseUpdateDto.schedule != null) {
            existingCourse.schedule = courseUpdateDto.schedule;
        }

        if (courseUpdateDto.description != null) {
            existingCourse.description = courseUpdateDto.description;
        }

        return await this.courseRepository.save(existingCourse);
    }

    async updateMany(
        courseUpdateBulkDtos: CourseUpdateBulkDto[]
    ): Promise<Course[]> {
        const courses: Course[] = [];

        for (const courseUpdateBulkDto of courseUpdateBulkDtos) {
            const existingCourse = await this.courseRepository.findOneBy({
                id: courseUpdateBulkDto.id
            });

            if (!existingCourse) {
                throw new EntityNotFoundError('Course not found');
            }

            if (courseUpdateBulkDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingCourse.version,
                    -1
                );
            }

            if (courseUpdateBulkDto.version !== existingCourse.version) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingCourse.version,
                    courseUpdateBulkDto.version
                );
            }

            if (courseUpdateBulkDto.key != null) {
                existingCourse.key = courseUpdateBulkDto.key;
            }

            if (courseUpdateBulkDto.classroomId != null) {
                const classroom = await this.classroomRepository.findOneBy({
                    id: courseUpdateBulkDto.classroomId
                });

                if (!classroom) {
                    throw new EntityNotFoundError('Classroom not found');
                }

                existingCourse.classroom = classroom;
            }

            if (courseUpdateBulkDto.schedule != null) {
                existingCourse.schedule = courseUpdateBulkDto.schedule;
            }

            if (courseUpdateBulkDto.description != null) {
                existingCourse.description = courseUpdateBulkDto.description;
            }

            courses.push(existingCourse);
        }

        return await this.courseRepository.save(courses);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.courseRepository.delete(id);
    }
}
