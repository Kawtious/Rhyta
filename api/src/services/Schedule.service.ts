import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { ScheduleInsertDto } from '../dto/ScheduleInsert.dto';
import { ScheduleUpdateDto } from '../dto/ScheduleUpdate.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
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

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Schedule>> {
        const [schedules, count] = await this.scheduleRepository.findAndCount({
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(schedules, pageMetaDto);
    }

    async getAllByProfessorId(
        professorId: number,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<Schedule>> {
        const [schedules, count] = await this.scheduleRepository.findAndCount({
            where: {
                professor: { id: professorId }
            },
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(schedules, pageMetaDto);
    }

    async getAllByClassroomId(
        classroomId: number,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<Schedule>> {
        const [schedules, count] = await this.scheduleRepository.findAndCount({
            where: {
                classroom: { id: classroomId }
            },
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(schedules, pageMetaDto);
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

    async getByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number
    ): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({
            relations: { professor: true },
            where: { cycle: { id: cycleId }, professor: { id: professorId } }
        });

        if (!schedule) {
            throw new EntityNotFoundError('Schedule not found');
        }

        return schedule;
    }

    async getByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number
    ): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({
            where: { classroom: { id: classroomId }, cycle: { id: cycleId } }
        });

        if (!schedule) {
            throw new EntityNotFoundError('Schedule not found');
        }

        return schedule;
    }

    async insertByProfessorId(
        professorId: number,
        scheduleInsertDto: ScheduleInsertDto
    ): Promise<Schedule> {
        const professor = await this.professorRepository.findOneBy({
            id: professorId
        });

        if (!professor) {
            throw new EntityNotFoundError('Professor not found');
        }

        const cycle = await this.cycleRepository.findOneBy({
            id: scheduleInsertDto.cycleId
        });

        if (!cycle) {
            throw new EntityNotFoundError('Cycle not found');
        }

        const schedule = new Schedule();

        schedule.cycle = cycle;
        schedule.professor = professor;
        schedule.title = scheduleInsertDto.title;

        if (scheduleInsertDto.description != null) {
            schedule.description = scheduleInsertDto.description;
        }

        return await this.scheduleRepository.save(schedule);
    }

    async insertByClassroomId(
        classroomId: number,
        scheduleInsertDto: ScheduleInsertDto
    ): Promise<Schedule> {
        const classroom = await this.classroomRepository.findOneBy({
            id: classroomId
        });

        if (!classroom) {
            throw new EntityNotFoundError('Classroom not found');
        }

        const cycle = await this.cycleRepository.findOneBy({
            id: scheduleInsertDto.cycleId
        });

        if (!cycle) {
            throw new EntityNotFoundError('Cycle not found');
        }

        const schedule = new Schedule();

        schedule.cycle = cycle;
        schedule.classroom = classroom;
        schedule.title = scheduleInsertDto.title;

        if (scheduleInsertDto.description != null) {
            schedule.description = scheduleInsertDto.description;
        }

        return await this.scheduleRepository.save(schedule);
    }

    async updateByCycleIdAndProfessorId(
        cycleId: number,
        professorId: number,
        scheduleUpdateDto: ScheduleUpdateDto
    ): Promise<Schedule> {
        const existingSchedule = await this.scheduleRepository.findOneBy({
            cycle: {
                id: cycleId
            },
            professor: {
                id: professorId
            }
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

        if (scheduleUpdateDto.title != null) {
            existingSchedule.title = scheduleUpdateDto.title;
        }

        if (scheduleUpdateDto.description != null) {
            existingSchedule.description = scheduleUpdateDto.description;
        }

        return await this.scheduleRepository.save(existingSchedule);
    }

    async updateByCycleIdAndClassroomId(
        cycleId: number,
        classroomId: number,
        scheduleUpdateDto: ScheduleUpdateDto
    ): Promise<Schedule> {
        const existingSchedule = await this.scheduleRepository.findOneBy({
            classroom: {
                id: classroomId
            },
            cycle: {
                id: cycleId
            }
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
