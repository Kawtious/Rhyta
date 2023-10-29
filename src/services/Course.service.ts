/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious, Zeferito
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CourseDto } from '../dto/Course.dto';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';

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
