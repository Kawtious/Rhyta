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
import ProfessorEventService from '../../src/services/ProfessorEvent.service';
import { ProfessorEventModel } from '../../src/models/ProfessorEvent.model';
import { EntityNotFoundError } from '../../src/errors/EntityNotFoundError';
import { ProfessorModel } from '../../src/models/Professor.model';

jest.mock('../../main/repositories/ProfessorEventRepository');
jest.mock('../../main/repositories/ProfessorRepository');

describe('ProfessorEventService', () => {
    const professorRepository =
        require('../../src/repositories/Professor.repository').professorRepository;
    professorRepository.findOneBy = jest.fn();

    const professorEventRepository =
        require('../../src/repositories/ProfessorEvent.repository').professorEventRepository;
    professorEventRepository.findBy = jest.fn();
    professorEventRepository.findOneBy = jest.fn();
    professorEventRepository.save = jest.fn();
    professorEventRepository.delete = jest.fn();

    const mockProfessorEvent = new ProfessorEventModel();
    mockProfessorEvent.id = 1;
    mockProfessorEvent.title = 'Event 1';
    mockProfessorEvent.description = 'Event Description';
    mockProfessorEvent.startDate = new Date('2023-01-01');
    mockProfessorEvent.endDate = new Date('2023-01-02');

    const mockProfessor = new ProfessorModel();
    mockProfessor.id = 1;
    mockProfessor.firstName = 'John';
    mockProfessor.lastName = 'Doe';
    mockProfessor.events = [mockProfessorEvent];

    describe('getAllByProfessorId', () => {
        it('should return an array of professor events by professor ID', async () => {
            professorEventRepository.findBy.mockResolvedValue([
                mockProfessorEvent
            ]);

            const result = await ProfessorEventService.getAllByProfessorId(1);

            expect(result).toEqual([mockProfessorEvent]);
        });

        it('should return an empty array if there are no professor events for the professor', async () => {
            professorEventRepository.findBy.mockResolvedValue([]);

            const result = await ProfessorEventService.getAllByProfessorId(1);

            expect(result).toEqual([]);
        });

        it('should throw an error if there is a database error', async () => {
            professorEventRepository.findBy.mockRejectedValue(
                new Error('Database error')
            );

            await expect(
                ProfessorEventService.getAllByProfessorId(1)
            ).rejects.toThrow('Database error');
        });
    });

    describe('getByProfessorId', () => {
        it('should return a professor event by professor ID and event ID', async () => {
            professorEventRepository.findOneBy.mockResolvedValue(
                mockProfessorEvent
            );

            const result = await ProfessorEventService.getByProfessorId(1, 1);

            expect(result).toEqual(mockProfessorEvent);
        });

        it('should throw an EntityNotFoundError if the professor event does not exist', async () => {
            professorEventRepository.findOneBy.mockResolvedValue(null);

            await expect(
                ProfessorEventService.getByProfessorId(1, 1)
            ).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            professorEventRepository.findOneBy.mockRejectedValue(
                new Error('Database error')
            );

            await expect(
                ProfessorEventService.getByProfessorId(1, 1)
            ).rejects.toThrow('Database error');
        });
    });

    describe('insertByProfessorId', () => {
        it('should insert a new professor event and return it', async () => {
            professorEventRepository.save.mockResolvedValue(mockProfessorEvent);
            professorRepository.findOneBy.mockResolvedValue(mockProfessor);

            const result = await ProfessorEventService.insertByProfessorId(
                1,
                'New Event',
                'New Event Description',
                new Date(),
                new Date()
            );

            expect(result).toEqual(mockProfessorEvent);
        });

        it('should throw an EntityNotFoundError if the professor does not exist', async () => {
            professorRepository.findOneBy.mockResolvedValue(null);

            await expect(
                ProfessorEventService.insertByProfessorId(
                    1,
                    'New Event',
                    'New Event Description',
                    new Date(),
                    new Date()
                )
            ).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            professorEventRepository.save.mockRejectedValue(
                new Error('Database error')
            );
            professorRepository.findOneBy.mockResolvedValue(mockProfessor);

            await expect(
                ProfessorEventService.insertByProfessorId(
                    1,
                    'New Event',
                    'New Event Description',
                    new Date(),
                    new Date()
                )
            ).rejects.toThrow('Database error');
        });
    });

    describe('updateByProfessorId', () => {
        it('should update an existing professor event and return the updated professor event', async () => {
            professorEventRepository.findOneBy.mockResolvedValue(
                mockProfessorEvent
            );
            professorEventRepository.save.mockResolvedValue(mockProfessorEvent);

            const result = await ProfessorEventService.updateByProfessorId(
                1,
                1,
                'Updated Event',
                'Updated Event Description',
                new Date(),
                new Date()
            );

            expect(result).toEqual(mockProfessorEvent);
        });

        it('should throw an EntityNotFoundError if the professor event does not exist', async () => {
            professorEventRepository.findOneBy.mockResolvedValue(null);

            await expect(
                ProfessorEventService.updateByProfessorId(
                    1,
                    1,
                    'Updated Event',
                    'Updated Event Description',
                    new Date(),
                    new Date()
                )
            ).rejects.toThrow(EntityNotFoundError);
        });

        it('should throw an error if there is a database error', async () => {
            professorEventRepository.findOneBy.mockResolvedValue(
                mockProfessorEvent
            );
            professorEventRepository.save.mockRejectedValue(
                new Error('Database error')
            );

            await expect(
                ProfessorEventService.updateByProfessorId(
                    1,
                    1,
                    'Updated Event',
                    'Updated Event Description',
                    new Date(),
                    new Date()
                )
            ).rejects.toThrow('Database error');
        });
    });

    describe('deleteByProfessorId', () => {
        it('should delete a professor event by professor ID and event ID and return the number of deleted professor events', async () => {
            professorEventRepository.delete.mockResolvedValue({ affected: 1 });

            const result = await ProfessorEventService.deleteByProfessorId(
                1,
                1
            );

            expect(result.affected).toEqual(1);
        });

        it('should return 0 if the professor event does not exist', async () => {
            professorEventRepository.delete.mockResolvedValue({ affected: 0 });

            const result = await ProfessorEventService.deleteByProfessorId(
                1,
                1
            );

            expect(result.affected).toEqual(0);
        });

        it('should throw an error if there is a database error', async () => {
            professorEventRepository.delete.mockRejectedValue(
                new Error('Database error')
            );

            await expect(
                ProfessorEventService.deleteByProfessorId(1, 1)
            ).rejects.toThrow('Database error');
        });
    });
});
