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
import CareerService from '../../src/services/Career.service';
import { CareerModel } from '../../src/models/Career.model';
import { EntityNotFoundError } from '../../src/errors/EntityNotFoundError';
import { CourseModel } from '../../src/models/Course.model';

jest.mock('../../main/repositories/CareerRepository');

describe('CareerService', () => {
    const careerRepository =
        require('../../src/repositories/Career.repository').careerRepository;
    careerRepository.find = jest.fn();
    careerRepository.findOneBy = jest.fn();
    careerRepository.save = jest.fn();
    careerRepository.delete = jest.fn();

    const mockCourse = new CourseModel();
    mockCourse.id = 1;
    mockCourse.name = 'CourseModel 1';
    mockCourse.description = 'Description 1';

    const mockCareer = new CareerModel();
    mockCareer.id = 1;
    mockCareer.name = 'CareerModel 1';
    mockCareer.description = 'Description 1';
    mockCareer.courses = [mockCourse];

    describe('getAll', () => {
        it('should return an array of careers', async () => {
            const careers = [mockCareer];
            careerRepository.find.mockResolvedValue(careers);

            const result = await CareerService.getAll();

            expect(result).toEqual(careers);
        });

        it('should return an empty array if there are no careers', async () => {
            careerRepository.find.mockResolvedValue([]);

            const result = await CareerService.getAll();

            expect(result).toEqual([]);
        });

        it('should throw an error if there is a database error', async () => {
            careerRepository.find.mockRejectedValue(
                new Error('Database error')
            );

            await expect(CareerService.getAll()).rejects.toThrow(
                'Database error'
            );
        });
    });

    describe('getById', () => {
        it('should return a career by ID', async () => {
            careerRepository.findOneBy.mockResolvedValue(mockCareer);

            const result = await CareerService.getById(1);

            expect(result).toEqual(mockCareer);
        });

        it('should return null if the career does not exist', async () => {
            careerRepository.findOneBy.mockResolvedValue(null);

            await expect(CareerService.getById(1)).rejects.toThrow(
                EntityNotFoundError
            );
        });

        it('should throw an EntityNotFoundError if the career does not exist', async () => {
            careerRepository.findOneBy.mockResolvedValue(null);

            await expect(CareerService.getById(1)).rejects.toThrow(
                EntityNotFoundError
            );
        });

        it('should throw an error if there is a database error', async () => {
            careerRepository.findOneBy.mockRejectedValue(
                new Error('Database error')
            );

            await expect(CareerService.getById(1)).rejects.toThrow(
                'Database error'
            );
        });
    });

    describe('insert', () => {
        it('should insert a new career and return it', async () => {
            careerRepository.save.mockResolvedValue(mockCareer);

            const result = await CareerService.insert(
                mockCareer.name,
                mockCareer.description
            );

            expect(result).toEqual(mockCareer);
        });

        it('should throw an error if there is a database error', async () => {
            careerRepository.save.mockRejectedValue(
                new Error('Database error')
            );

            await expect(
                CareerService.insert('CareerModel 1', 'Description 1')
            ).rejects.toThrow('Database error');
        });
    });

    describe('update', () => {
        it('should update an existing career and return the updated career', async () => {
            careerRepository.findOneBy.mockResolvedValue(mockCareer);
            careerRepository.save.mockResolvedValue(mockCareer);

            const result = await CareerService.update(
                1,
                'Updated CareerModel 1',
                'Updated Description 1'
            );

            expect(result).toEqual(mockCareer);
        });

        it('should throw an EntityNotFoundError if the career does not exist', async () => {
            careerRepository.findOneBy.mockResolvedValue(null);

            await expect(
                CareerService.update(
                    1,
                    'Updated CareerModel 1',
                    'Updated Description 1'
                )
            ).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            careerRepository.findOneBy.mockResolvedValue(mockCareer);
            careerRepository.save.mockRejectedValue(
                new Error('Database error')
            );

            await expect(
                CareerService.update(
                    1,
                    'Updated CareerModel 1',
                    'Updated Description 1'
                )
            ).rejects.toThrow('Database error');
        });
    });

    describe('delete', () => {
        it('should delete a career by ID and return the number of deleted careers', async () => {
            careerRepository.delete.mockResolvedValue({ affected: 1 });

            const result = await CareerService.delete(1);

            expect(result.affected).toEqual(1);
        });

        it('should return 0 if the career does not exist', async () => {
            careerRepository.delete.mockResolvedValue({ affected: 0 });

            const result = await CareerService.delete(1);

            expect(result.affected).toEqual(0);
        });

        it('should throw an error if there is a database error', async () => {
            careerRepository.delete.mockRejectedValue(
                new Error('Database error')
            );

            await expect(CareerService.delete(1)).rejects.toThrow(
                'Database error'
            );
        });
    });
});
