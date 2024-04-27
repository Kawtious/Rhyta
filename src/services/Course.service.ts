import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CourseInsertDto } from '../dto/CourseInsert.dto';
import { CourseUpdateDto } from '../dto/CourseUpdate.dto';
import { CourseUpdateBulkDto } from '../dto/CourseUpdateBulk.dto';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Career, 'mySqlConnection')
        private readonly careerRepository: Repository<Career>
    ) {}

    async getAll(): Promise<Course[]> {
        return await this.courseRepository.find();
    }

    async getById(id: number): Promise<Course> {
        const course = await this.courseRepository.findOneBy({ id: id });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        return course;
    }

    async insert(courseInsertDto: CourseInsertDto): Promise<Course> {
        const course = new Course();

        course.courseKey = courseInsertDto.courseKey;
        course.classKey = courseInsertDto.classKey;
        course.scheduleKey = courseInsertDto.scheduleKey;
        course.descriptionKey = courseInsertDto.descriptionKey;

        const career = await this.careerRepository.findOneBy({
            id: courseInsertDto.careerId
        });

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        course.career = career;

        return await this.courseRepository.save(course);
    }

    async insertBulk(courseInsertDtos: CourseInsertDto[]): Promise<Course[]> {
        const courses: Course[] = [];

        for (const courseInsertDto of courseInsertDtos) {
            const course = new Course();

            course.courseKey = courseInsertDto.courseKey;
            course.classKey = courseInsertDto.classKey;
            course.scheduleKey = courseInsertDto.scheduleKey;
            course.descriptionKey = courseInsertDto.descriptionKey;

            const career = await this.careerRepository.findOneBy({
                id: courseInsertDto.careerId
            });

            if (!career) {
                throw new EntityNotFoundError('Career not found');
            }

            course.career = career;

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

        if (courseUpdateDto.courseKey != null) {
            existingCourse.courseKey = courseUpdateDto.courseKey;
        }

        if (courseUpdateDto.classKey != null) {
            existingCourse.classKey = courseUpdateDto.classKey;
        }

        if (courseUpdateDto.scheduleKey != null) {
            existingCourse.scheduleKey = courseUpdateDto.scheduleKey;
        }

        if (courseUpdateDto.descriptionKey != null) {
            existingCourse.descriptionKey = courseUpdateDto.descriptionKey;
        }

        if (courseUpdateDto.careerId != null) {
            const career = await this.careerRepository.findOneBy({
                id: courseUpdateDto.careerId
            });

            if (!career) {
                throw new EntityNotFoundError('Career not found');
            }

            existingCourse.career = career;
        }

        return await this.courseRepository.save(existingCourse);
    }

    async updateBulk(
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

            if (courseUpdateBulkDto.courseKey != null) {
                existingCourse.courseKey = courseUpdateBulkDto.courseKey;
            }

            if (courseUpdateBulkDto.classKey != null) {
                existingCourse.classKey = courseUpdateBulkDto.classKey;
            }

            if (courseUpdateBulkDto.scheduleKey != null) {
                existingCourse.scheduleKey = courseUpdateBulkDto.scheduleKey;
            }

            if (courseUpdateBulkDto.descriptionKey != null) {
                existingCourse.descriptionKey =
                    courseUpdateBulkDto.descriptionKey;
            }

            if (courseUpdateBulkDto.careerId != null) {
                const career = await this.careerRepository.findOneBy({
                    id: courseUpdateBulkDto.careerId
                });

                if (!career) {
                    throw new EntityNotFoundError('Career not found');
                }

                existingCourse.career = career;
            }

            courses.push(existingCourse);
        }

        return await this.courseRepository.save(courses);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.courseRepository.delete(id);
    }
}
