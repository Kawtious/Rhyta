import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ScheduleInsertDto } from '../dto/ScheduleInsert.dto';
import { ScheduleUpdateDto } from '../dto/ScheduleUpdate.dto';
import { Classroom } from '../entities/Classroom.entity';
import { Cycle } from '../entities/Cycle.entity';
import { Professor } from '../entities/Professor.entity';
import { Schedule } from '../entities/Schedule.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailureError';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Cycle, 'mySqlConnection')
        private readonly cycleRepository: Repository<Cycle>,
        @InjectRepository(Classroom, 'mySqlConnection')
        private readonly classroomRepository: Repository<Classroom>,
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>,
        @InjectRepository(Schedule, 'mySqlConnection')
        private readonly scheduleRepository: Repository<Schedule>
    ) {}

    async getAll(): Promise<Schedule[]> {
        return await this.scheduleRepository.find();
    }

    async getById(id: number): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOneBy({
            id: id
        });

        if (!schedule) {
            throw new EntityNotFoundError('Schedule not found');
        }

        return schedule;
    }

    async getByProfessorIdAndCycleId(
        professorId: number,
        cycleId: number
    ): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({
            relations: { professor: true },
            where: { professor: { id: professorId }, cycle: { id: cycleId } }
        });

        if (!schedule) {
            throw new EntityNotFoundError('Schedule not found');
        }

        return schedule;
    }

    async insert(scheduleInsertDto: ScheduleInsertDto): Promise<Schedule> {
        const schedule = new Schedule();

        if (scheduleInsertDto.professorId != null) {
            const professor = await this.professorRepository.findOneBy({
                id: scheduleInsertDto.professorId
            });

            if (!professor) {
                throw new EntityNotFoundError('Professor not found');
            }

            schedule.professor = professor;
        }

        if (scheduleInsertDto.classroomId != null) {
            const classroom = await this.classroomRepository.findOneBy({
                id: scheduleInsertDto.classroomId
            });

            if (!classroom) {
                throw new EntityNotFoundError('Classroom not found');
            }

            schedule.classroom = classroom;
        }

        const cycle = await this.cycleRepository.findOneBy({
            id: scheduleInsertDto.cycleId
        });

        if (!cycle) {
            throw new EntityNotFoundError('Cycle not found');
        }

        schedule.cycle = cycle;

        schedule.title = scheduleInsertDto.title;

        if (scheduleInsertDto.description != null) {
            schedule.description = scheduleInsertDto.description;
        }

        return await this.scheduleRepository.save(schedule);
    }

    async update(
        id: number,
        scheduleUpdateDto: ScheduleUpdateDto
    ): Promise<Schedule> {
        const existingSchedule = await this.scheduleRepository.findOneBy({
            id: id
        });

        if (!existingSchedule) {
            throw new EntityNotFoundError('Schedule not found');
        }

        if (scheduleUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                -1
            );
        }

        if (scheduleUpdateDto.version !== existingSchedule.version) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSchedule.version,
                scheduleUpdateDto.version
            );
        }

        if (scheduleUpdateDto.professorId != null) {
            const professor = await this.professorRepository.findOneBy({
                id: scheduleUpdateDto.professorId
            });

            if (!professor) {
                throw new EntityNotFoundError('Professor not found');
            }

            existingSchedule.professor = professor;
        }

        if (scheduleUpdateDto.classroomId != null) {
            const classroom = await this.classroomRepository.findOneBy({
                id: scheduleUpdateDto.classroomId
            });

            if (!classroom) {
                throw new EntityNotFoundError('Classroom not found');
            }

            existingSchedule.classroom = classroom;
        }

        if (scheduleUpdateDto.cycleId != null) {
            const cycle = await this.cycleRepository.findOneBy({
                id: scheduleUpdateDto.cycleId
            });

            if (!cycle) {
                throw new EntityNotFoundError('Cycle not found');
            }

            existingSchedule.cycle = cycle;
        }

        if (scheduleUpdateDto.title != null) {
            existingSchedule.title = scheduleUpdateDto.title;
        }

        if (scheduleUpdateDto.description != null) {
            existingSchedule.description = scheduleUpdateDto.description;
        }

        return await this.scheduleRepository.save(existingSchedule);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.scheduleRepository.delete(id);
    }
}
