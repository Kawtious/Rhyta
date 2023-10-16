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
import TermService from '../../main/services/TermService';
import {Term} from '../../main/models/Term';
import {EntityNotFoundError} from '../../main/errors/EntityNotFoundError';

jest.mock('../../main/repositories/TermRepository');

describe('TermService', () => {
    const termRepository = require('../../main/repositories/TermRepository').termRepository;
    termRepository.find = jest.fn();
    termRepository.findOneBy = jest.fn();
    termRepository.save = jest.fn();
    termRepository.delete = jest.fn();

    const mockTerm = new Term();
    mockTerm.id = 1;
    mockTerm.title = 'Term 1';
    mockTerm.description = 'Term Description';
    mockTerm.startDate = new Date('2023-01-01');
    mockTerm.endDate = new Date('2023-06-30');

    describe('getAll', () => {
        it('should return an array of terms', async () => {
            termRepository.find.mockResolvedValue([mockTerm]);

            const result = await TermService.getAll();

            expect(result).toEqual([mockTerm]);
        });

        it('should return an empty array if there are no terms', async () => {
            termRepository.find.mockResolvedValue([]);

            const result = await TermService.getAll();

            expect(result).toEqual([]);
        });

        it('should throw an error if there is a database error', async () => {
            termRepository.find.mockRejectedValue(new Error('Database error'));

            await expect(TermService.getAll()).rejects.toThrow('Database error');
        });
    });

    describe('getById', () => {
        it('should return a term by ID', async () => {
            termRepository.findOneBy.mockResolvedValue(mockTerm);

            const result = await TermService.getById(1);

            expect(result).toEqual(mockTerm);
        });

        it('should throw an EntityNotFoundError if the term does not exist', async () => {
            termRepository.findOneBy.mockResolvedValue(null);

            await expect(TermService.getById(1)).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            termRepository.findOneBy.mockRejectedValue(new Error('Database error'));

            await expect(TermService.getById(1)).rejects.toThrow('Database error');
        });
    });

    describe('insert', () => {
        it('should insert a new term and return it', async () => {
            termRepository.save.mockResolvedValue(mockTerm);

            const result = await TermService.insert('New Term', 'New Term Description', new Date(), new Date());

            expect(result).toEqual(mockTerm);
        });

        it('should throw an error if there is a database error', async () => {
            termRepository.save.mockRejectedValue(new Error('Database error'));

            await expect(TermService.insert('New Term', 'New Term Description', new Date(), new Date())).rejects.toThrow('Database error');
        });
    });

    describe('update', () => {
        it('should update an existing term and return the updated term', async () => {
            termRepository.findOneBy.mockResolvedValue(mockTerm);
            termRepository.save.mockResolvedValue(mockTerm);

            const result = await TermService.update(1, 'Updated Term', 'Updated Term Description', new Date(), new Date());

            expect(result).toEqual(mockTerm);
        });

        it('should throw an EntityNotFoundError if the term does not exist', async () => {
            termRepository.findOneBy.mockResolvedValue(null);

            await expect(TermService.update(1, 'Updated Term', 'Updated Term Description', new Date(), new Date())).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            termRepository.findOneBy.mockResolvedValue(mockTerm);
            termRepository.save.mockRejectedValue(new Error('Database error'));

            await expect(TermService.update(1, 'Updated Term', 'Updated Term Description', new Date(), new Date())).rejects.toThrow('Database error');
        });
    });

    describe('delete', () => {
        it('should delete a term by ID and return the number of deleted terms', async () => {
            termRepository.delete.mockResolvedValue({affected: 1});

            const result = await TermService.delete(1);

            expect(result.affected).toEqual(1);
        });

        it('should return 0 if the term does not exist', async () => {
            termRepository.delete.mockResolvedValue({affected: 0});

            const result = await TermService.delete(1);

            expect(result.affected).toEqual(0);
        });

        it('should throw an error if there is a database error', async () => {
            termRepository.delete.mockRejectedValue(new Error('Database error'));

            await expect(TermService.delete(1)).rejects.toThrow('Database error');
        });
    });
});
