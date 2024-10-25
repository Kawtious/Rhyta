import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { Classroom } from '../entities/Classroom.entity';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { Professor } from '../entities/Professor.entity';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleType } from '../entities/ScheduleType.entity';
import { SemesterCareer } from '../entities/SemesterCareer.entity';
import { HexConverter } from '../utils/HexConverter.util';

@Injectable()
export class ExportService {
    constructor(
        @InjectRepository(Classroom, 'mySqlConnection')
        private readonly classroomRepository: Repository<Classroom>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Group, 'mySqlConnection')
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(SemesterCareer, 'mySqlConnection')
        private readonly semesterCareerRepository: Repository<SemesterCareer>,
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>,
        @InjectRepository(Schedule, 'mySqlConnection')
        private readonly scheduleRepository: Repository<Schedule>,
        @InjectRepository(ScheduleType, 'mySqlConnection')
        private readonly scheduleTypeRepository: Repository<ScheduleType>,
        @InjectRepository(AvailabilitySchedule, 'mySqlConnection')
        private readonly availabilityScheduleRepository: Repository<AvailabilitySchedule>
    ) {}

    async exportCoursesAsCSV(): Promise<string> {
        let output: string = '';

        const courses = await this.courseRepository.find({
            relations: { classroom: true }
        });

        for (const course of courses) {
            output += `${course.key},${course.classroom.type},${course.schedule},${course.description}\n`;
        }

        return output;
    }

    async exportGroupsAsCSV(): Promise<string> {
        let output: string = '';

        const groups = await this.groupRepository.find({
            relations: { course: true, professor: true }
        });

        for (const group of groups) {
            output += `${group.course.key},${group.group},${group.professor.controlNumber}\n`;
        }

        return output;
    }

    async exportSemesterCareersAsCSV(): Promise<string> {
        let output: string = '';

        const semesterCareers = await this.semesterCareerRepository.find({
            relations: { career: true, course: true }
        });

        for (const semesterCareer of semesterCareers) {
            output += `${semesterCareer.career.key}${semesterCareer.semester},${semesterCareer.course.key},${semesterCareer.start},${semesterCareer.end}\n`;
        }

        return output;
    }

    async exportProfessorsAsCSV(): Promise<string> {
        let output: string = '';

        const professors = await this.professorRepository.find();

        for (const professor of professors) {
            output += `${professor.type},${professor.controlNumber},${professor.name}\n`;
        }

        return output;
    }

    async exportSchedulesAsCSV(): Promise<string> {
        let output: string = '';

        const schedules = await this.scheduleRepository.find({
            relations: { scheduleType: true }
        });

        for (const schedule of schedules) {
            output += `${schedule.type},${schedule.offset},${schedule.scheduleType.sessionMask},${schedule.scheduleType.description}\n`;
        }

        return output;
    }

    async exportScheduleTypesAsCSV(): Promise<string> {
        let output: string = '';

        const scheduleTypes = await this.scheduleTypeRepository.find();

        for (const scheduleType of scheduleTypes) {
            output += `${scheduleType.description},${scheduleType.availableHours},${scheduleType.sessionMask}\n`;
        }

        return output;
    }

    async exportProfessorsAvailabilityScheduleAsBinary(
        cycleId: number
    ): Promise<StreamableFile> {
        const [professors, count] =
            await this.professorRepository.findAndCount();

        let hex: string = HexConverter.numberToPaddedHex(count, 4, true);

        for (const professor of professors) {
            const availabilitySchedule =
                await this.availabilityScheduleRepository.findOne({
                    relations: { entries: true },
                    where: {
                        cycle: { id: cycleId },
                        professor: { id: professor.id }
                    }
                });

            if (availabilitySchedule == null) {
                continue;
            }

            hex += HexConverter.stringToPaddedHex(professor.type, 4);
            hex += HexConverter.numberToPaddedHex(
                professor.controlNumber,
                4,
                true
            );
            hex += HexConverter.stringToHexWithNullTerminator(professor.name);

            const availabilityScheduleBytes: string[][] = [];

            for (let i = 0; i < 6; i++) {
                availabilityScheduleBytes[i] = [];
                for (let j = 0; j < 29; j++) {
                    availabilityScheduleBytes[i][j] =
                        HexConverter.getEmptyBytes(4);
                }
            }

            for (const availabilityScheduleEntry of availabilitySchedule.entries) {
                const value = availabilityScheduleEntry.value > 0;

                availabilityScheduleBytes[availabilityScheduleEntry.day][
                    availabilityScheduleEntry.hour
                ] = HexConverter.booleanToHex(value, 4, false);
            }

            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 28; j++) {
                    hex += availabilityScheduleBytes[i][j];
                }
            }
        }

        return new StreamableFile(Buffer.from(hex, 'hex'));
    }

    async exportClassroomsAvailabilityScheduleAsBinary(
        cycleId: number
    ): Promise<StreamableFile> {
        const [classrooms, count] =
            await this.classroomRepository.findAndCount();

        let hex: string = HexConverter.numberToPaddedHex(count, 4, true);

        for (const classroom of classrooms) {
            const availabilitySchedule =
                await this.availabilityScheduleRepository.findOne({
                    relations: { entries: true },
                    where: {
                        classroom: { id: classroom.id },
                        cycle: { id: cycleId }
                    }
                });

            if (availabilitySchedule == null) {
                continue;
            }

            hex += HexConverter.stringToPaddedHex(classroom.type, 4);

            const availabilityScheduleBytes: string[][] = [];

            for (let i = 0; i < 6; i++) {
                availabilityScheduleBytes[i] = [];
                for (let j = 0; j < 29; j++) {
                    availabilityScheduleBytes[i][j] =
                        HexConverter.getEmptyBytes(4);
                }
            }

            for (const availabilityScheduleEntry of availabilitySchedule.entries) {
                availabilityScheduleBytes[availabilityScheduleEntry.day][
                    availabilityScheduleEntry.hour
                ] = HexConverter.numberToPaddedHex(
                    availabilityScheduleEntry.value,
                    4,
                    false
                );
            }

            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 29; j++) {
                    hex += availabilityScheduleBytes[i][j];
                }
            }
        }

        return new StreamableFile(Buffer.from(hex, 'hex'));
    }
}
