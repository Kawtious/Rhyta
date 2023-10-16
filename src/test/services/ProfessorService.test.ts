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
import ProfessorService from '../../main/services/ProfessorService';
import {Professor} from '../../main/models/Professor';
import {EntityNotFoundError} from "../../main/errors/EntityNotFoundError";
import {ProfessorEvent} from "../../main/models/ProfessorEvent";

jest.mock('../../main/repositories/ProfessorRepository');

describe('ProfessorService', () => {
    const professorRepository = require('../../main/repositories/ProfessorRepository').professorRepository;
    professorRepository.find = jest.fn();
    professorRepository.findOneBy = jest.fn();
    professorRepository.save = jest.fn();
    professorRepository.delete = jest.fn();

    const mockProfessorEvent = new ProfessorEvent();
    mockProfessorEvent.id = 1;
    mockProfessorEvent.title = 'Event 1';
    mockProfessorEvent.description = 'Event Description';
    mockProfessorEvent.startDate = new Date('2023-01-01');
    mockProfessorEvent.endDate = new Date('2023-01-02');

    const mockProfessor = new Professor();
    mockProfessor.id = 1;
    mockProfessor.firstName = 'John';
    mockProfessor.lastName = 'Doe';
    mockProfessor.events = [mockProfessorEvent];

    describe('getAll', () => {
        it('should return an array of professors', async () => {
            professorRepository.find.mockResolvedValue([mockProfessor]);

            const result = await ProfessorService.getAll();

            expect(result).toEqual([mockProfessor]);
        });

        it('should return an empty array if there are no professors', async () => {
            professorRepository.find.mockResolvedValue([]);

            const result = await ProfessorService.getAll();

            expect(result).toEqual([]);
        });

        it('should throw an error if there is a database error', async () => {
            professorRepository.find.mockRejectedValue(new Error('Database error'));

            await expect(ProfessorService.getAll()).rejects.toThrow('Database error');
        });
    });

    describe('getById', () => {
        it('should return a professor by ID', async () => {
            professorRepository.findOneBy.mockResolvedValue(mockProfessor);

            const result = await ProfessorService.getById(1);

            expect(result).toEqual(mockProfessor);
        });

        it('should throw an EntityNotFoundError if the professor does not exist', async () => {
            professorRepository.findOneBy.mockResolvedValue(null);

            await expect(ProfessorService.getById(1)).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            professorRepository.findOneBy.mockRejectedValue(new Error('Database error'));

            await expect(ProfessorService.getById(1)).rejects.toThrow('Database error');
        });
    });

    describe('insert', () => {
        it('should insert a new professor and return it', async () => {
            professorRepository.save.mockResolvedValue(mockProfessor);

            const result = await ProfessorService.insert('Alice', 'Smith');

            expect(result).toEqual(mockProfessor);
        });

        it('should throw an error if there is a database error', async () => {
            professorRepository.save.mockRejectedValue(new Error('Database error'));

            await expect(ProfessorService.insert('Alice', 'Smith')).rejects.toThrow('Database error');
        });
    });

    describe('update', () => {
        it('should update an existing professor and return the updated professor', async () => {
            professorRepository.findOneBy.mockResolvedValue(mockProfessor);
            professorRepository.save.mockResolvedValue(mockProfessor);

            const result = await ProfessorService.update(1, 'Updated John', 'Updated Doe');

            expect(result).toEqual(mockProfessor);
        });

        it('should throw an EntityNotFoundError if the professor does not exist', async () => {
            professorRepository.findOneBy.mockResolvedValue(null);

            await expect(ProfessorService.update(1, 'Updated John', 'Updated Doe')).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            professorRepository.findOneBy.mockResolvedValue(mockProfessor);
            professorRepository.save.mockRejectedValue(new Error('Database error'));

            await expect(ProfessorService.update(1, 'Updated John', 'Updated Doe')).rejects.toThrow('Database error');
        });
    });

    describe('delete', () => {
        it('should delete a professor by ID and return the number of deleted professors', async () => {
            professorRepository.delete.mockResolvedValue({affected: 1});

            const result = await ProfessorService.delete(1);

            expect(result.affected).toEqual(1);
        });

        it('should return 0 if the professor does not exist', async () => {
            professorRepository.delete.mockResolvedValue({affected: 0});

            const result = await ProfessorService.delete(1);

            expect(result.affected).toEqual(0);
        });

        it('should throw an error if there is a database error', async () => {
            professorRepository.delete.mockRejectedValue(new Error('Database error'));

            await expect(ProfessorService.delete(1)).rejects.toThrow('Database error');
        });
    });
});
