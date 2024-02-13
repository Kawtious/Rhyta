import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CourseDto } from '../dto/Course.dto';
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
        return await this.courseRepository.find({
            relations: { career: true }
        });
    }

    async count(): Promise<number> {
        return await this.courseRepository.count();
    }

    async getById(id: number): Promise<Course> {
        const course = await this.courseRepository.findOneBy({ id: id });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        return course;
    }

    async insert(courseDto: CourseDto): Promise<Course> {
        const existingCareer = await this.careerRepository.findOneBy({
            id: courseDto.careerId
        });

        if (!existingCareer) {
            throw new EntityNotFoundError('Career not found');
        }

        const course = new Course();

        course.name = courseDto.name;

        if (courseDto.description != null) {
            course.description = courseDto.description;
        }

        course.career = existingCareer;

        return await this.courseRepository.save(course);
    }

    async update(id: number, courseDto: CourseDto): Promise<Course> {
        const existingCourse = await this.courseRepository.findOneBy({
            id: id
        });

        if (!existingCourse) {
            throw new EntityNotFoundError('Course not found');
        }

        if (courseDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCourse.version,
                -1
            );
        }

        if (courseDto.version !== existingCourse.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingCourse.version,
                courseDto.version
            );
        }

        const existingCareer = await this.careerRepository.findOneBy({
            id: courseDto.careerId
        });

        if (!existingCareer) {
            throw new EntityNotFoundError('Career not found');
        }

        existingCourse.name = courseDto.name;

        if (courseDto.description != null) {
            existingCourse.description = courseDto.description;
        }

        existingCourse.career = existingCareer;

        return await this.courseRepository.save(existingCourse);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.courseRepository.delete(id);
    }
}
