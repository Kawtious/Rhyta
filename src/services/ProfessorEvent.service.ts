import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ProfessorEventDto } from '../dto/ProfessorEvent.dto';
import { Professor } from '../entities/Professor.entity';
import { ProfessorEvent } from '../entities/ProfessorEvent.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ProfessorEventService {
    constructor(
        @InjectRepository(ProfessorEvent, 'mySqlConnection')
        private readonly professorEventRepository: Repository<ProfessorEvent>,
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>
    ) {}

    async getAll(): Promise<ProfessorEvent[]> {
        return await this.professorEventRepository.find();
    }

    async count(): Promise<number> {
        return await this.professorEventRepository.count();
    }

    async getAllByProfessorId(professorId: number): Promise<ProfessorEvent[]> {
        return await this.professorEventRepository.findBy({
            professor: { id: professorId }
        });
    }

    async countByProfessorId(professorId: number): Promise<number> {
        return await this.professorEventRepository.countBy({
            professor: { id: professorId }
        });
    }

    async getByProfessorId(
        professorId: number,
        eventId: number
    ): Promise<ProfessorEvent> {
        const professorEvent = await this.professorEventRepository.findOneBy({
            id: eventId,
            professor: { id: professorId }
        });

        if (!professorEvent) {
            throw new EntityNotFoundError(
                'Professor, event, or both not found'
            );
        }

        return professorEvent;
    }

    async insertByProfessorId(
        professorId: number,
        professorEventDto: ProfessorEventDto
    ): Promise<ProfessorEvent> {
        const existingProfessor = await this.professorRepository.findOneBy({
            id: professorId
        });

        if (!existingProfessor) {
            throw new EntityNotFoundError('Professor not found');
        }

        const professorEvent = new ProfessorEvent();

        professorEvent.title = professorEventDto.title;

        if (professorEventDto.description != null) {
            professorEvent.description = professorEventDto.description;
        }

        professorEvent.startDate = professorEventDto.startDate;
        professorEvent.endDate = professorEventDto.endDate;

        professorEvent.professor = existingProfessor;

        return await this.professorEventRepository.save(professorEvent);
    }

    async updateByProfessorId(
        professorId: number,
        eventId: number,
        professorEventDto: ProfessorEventDto
    ): Promise<ProfessorEvent> {
        const existingProfessorEvent =
            await this.professorEventRepository.findOneBy({
                id: eventId,
                professor: { id: professorId }
            });

        if (!existingProfessorEvent) {
            throw new EntityNotFoundError(
                'Professor, event, or both not found'
            );
        }

        if (professorEventDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProfessorEvent.version,
                -1
            );
        }

        if (professorEventDto.version !== existingProfessorEvent.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingProfessorEvent.version,
                professorEventDto.version
            );
        }

        existingProfessorEvent.title = professorEventDto.title;

        if (professorEventDto.description != null) {
            existingProfessorEvent.description = professorEventDto.description;
        }

        existingProfessorEvent.startDate = professorEventDto.startDate;
        existingProfessorEvent.endDate = professorEventDto.endDate;

        return await this.professorEventRepository.save(existingProfessorEvent);
    }

    async deleteByProfessorId(
        professorId: number,
        eventId: number
    ): Promise<DeleteResult> {
        return await this.professorEventRepository.delete({
            id: eventId,
            professor: { id: professorId }
        });
    }
}
