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
import { CourseModel } from '../models/Course.model';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { courseRepository } from '../repositories/Course.repository';
import { DeleteResult } from 'typeorm';
import { careerRepository } from '../repositories/Career.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    async getAll(): Promise<CourseModel[]> {
        return await courseRepository.find();
    }

    async getById(id: number): Promise<CourseModel> {
        const course = await courseRepository.findOneBy({ id: id });

        if (!course) {
            throw new EntityNotFoundError('CourseModel not found');
        }

        return course;
    }

    async insert(
        name: string,
        description: string,
        careerId: number
    ): Promise<CourseModel> {
        const existingCareer = await careerRepository.findOneBy({
            id: careerId
        });

        if (!existingCareer) {
            throw new EntityNotFoundError('CareerModel not found');
        }

        const course = new CourseModel();
        course.name = name;
        course.description = description;
        course.career = existingCareer;

        return await courseRepository.save(course);
    }

    async update(
        id: number,
        name: string,
        description: string,
        careerId: number
    ): Promise<CourseModel> {
        const existingCourse = await courseRepository.findOneBy({ id: id });

        if (!existingCourse) {
            throw new EntityNotFoundError('CourseModel not found');
        }

        const existingCareer = await careerRepository.findOneBy({
            id: careerId
        });

        if (!existingCareer) {
            throw new EntityNotFoundError('CareerModel not found');
        }

        existingCourse.name = name;
        existingCourse.description = description;
        existingCourse.career = existingCareer;

        return await courseRepository.save(existingCourse);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await courseRepository.delete(id);
    }
}
