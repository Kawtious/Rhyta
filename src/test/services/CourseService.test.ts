/*
 * MIT License
 * 
 * Copyright (c) 2023 Kawtious, Zeferito
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import CourseService from '../../main/services/CourseService';
import {Course} from '../../main/models/Course';
import {EntityNotFoundError} from "../../main/errors/EntityNotFoundError";
import {Career} from "../../main/models/Career";

jest.mock('../../main/repositories/CourseRepository');
jest.mock('../../main/repositories/CareerRepository');

describe('CourseService', () => {
    const careerRepository = require('../../main/repositories/CareerRepository').careerRepository;
    careerRepository.findOneBy = jest.fn();

    const courseRepository = require('../../main/repositories/CourseRepository').courseRepository;
    courseRepository.find = jest.fn();
    courseRepository.findOneBy = jest.fn();
    courseRepository.save = jest.fn();
    courseRepository.delete = jest.fn();

    const mockCourse = new Course();
    mockCourse.id = 1;
    mockCourse.name = 'Course 1';
    mockCourse.description = 'Description 1';

    const mockCareer = new Career();
    mockCareer.id = 1;
    mockCareer.name = 'Career 1';
    mockCareer.description = 'Career Description';
    mockCareer.courses = [mockCourse];

    describe('getAll', () => {
        it('should return an array of courses', async () => {
            courseRepository.find.mockResolvedValue([mockCourse]);

            const result = await CourseService.getAll();

            expect(result).toEqual([mockCourse]);
        });

        it('should return an empty array if there are no courses', async () => {
            courseRepository.find.mockResolvedValue([]);
            const result = await CourseService.getAll();
            expect(result).toEqual([]);
        });

        it('should throw an error if there is a database error', async () => {
            courseRepository.find.mockRejectedValue(new Error('Database error'));

            await expect(CourseService.getAll()).rejects.toThrow('Database error');
        });
    });

    describe('getById', () => {
        it('should return a course by ID', async () => {
            courseRepository.findOneBy.mockResolvedValue(mockCourse);

            const result = await CourseService.getById(1);

            expect(result).toEqual(mockCourse);
        });

        it('should throw an EntityNotFoundError if the course does not exist', async () => {
            courseRepository.findOneBy.mockResolvedValue(null);

            await expect(CourseService.getById(1)).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            courseRepository.findOneBy.mockRejectedValue(new Error('Database error'));

            await expect(CourseService.getById(1)).rejects.toThrow('Database error');
        });
    });

    describe('insert', () => {
        it('should insert a new course and return it', async () => {
            courseRepository.save.mockResolvedValue(mockCourse);
            careerRepository.findOneBy.mockResolvedValue(mockCareer);

            const result = await CourseService.insert('New Course', 'New Description', 1);

            expect(result).toEqual(mockCourse);
        });

        it('should throw an EntityNotFoundError if the career does not exist', async () => {
            careerRepository.findOneBy.mockResolvedValue(null);

            await expect(CourseService.insert('New Course', 'New Description', 1)).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            courseRepository.save.mockRejectedValue(new Error('Database error'));
            careerRepository.findOneBy.mockResolvedValue(mockCareer);

            await expect(CourseService.insert('New Course', 'New Description', 1)).rejects.toThrow('Database error');
        });
    });

    describe('update', () => {
        it('should update an existing course and return the updated course', async () => {
            courseRepository.findOneBy.mockResolvedValue(mockCourse);
            courseRepository.save.mockResolvedValue(mockCourse);
            careerRepository.findOneBy.mockResolvedValue(mockCareer);

            const result = await CourseService.update(1, 'Updated Course', 'Updated Description', 1);

            expect(result).toEqual(mockCourse);
        });

        it('should throw an EntityNotFoundError if the course does not exist', async () => {
            courseRepository.findOneBy.mockResolvedValue(null);

            await expect(CourseService.update(1, 'Updated Course', 'Updated Description', 1)).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an EntityNotFoundError if the career does not exist', async () => {
            courseRepository.findOneBy.mockResolvedValue(mockCourse);
            careerRepository.findOneBy.mockResolvedValue(null);

            await expect(CourseService.update(1, 'Updated Course', 'Updated Description', 1)).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            courseRepository.findOneBy.mockResolvedValue(mockCourse);
            courseRepository.save.mockRejectedValue(new Error('Database error'));
            careerRepository.findOneBy.mockResolvedValue(mockCareer);

            await expect(CourseService.update(1, 'Updated Course', 'Updated Description', 1)).rejects.toThrow('Database error');
        });
    });

    describe('delete', () => {
        it('should delete a course by ID and return the number of deleted courses', async () => {
            courseRepository.delete.mockResolvedValue({affected: 1});

            const result = await CourseService.delete(1);

            expect(result.affected).toEqual(1);
        });

        it('should return 0 if the course does not exist', async () => {
            courseRepository.delete.mockResolvedValue({affected: 0});

            const result = await CourseService.delete(1);

            expect(result.affected).toEqual(0);
        });

        it('should throw an error if there is a database error', async () => {
            courseRepository.delete.mockRejectedValue(new Error('Database error'));

            await expect(CourseService.delete(1)).rejects.toThrow('Database error');
        });
    });
});
