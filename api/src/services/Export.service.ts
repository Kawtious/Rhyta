import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { ExportAvailabilitySchedulesClassroomsOptionsDto } from '../dto/options/export/ExportAvailabilitySchedulesClassroomsOptions.dto';
import { ExportAvailabilitySchedulesProfessorsOptionsDto } from '../dto/options/export/ExportAvailabilitySchedulesProfessorsOptions.dto';
import { ExportCoursesOptionsDto } from '../dto/options/export/ExportCoursesOptions.dto';
import { ExportGroupsOptionsDto } from '../dto/options/export/ExportGroupsOptions.dto';
import { ExportProfessorsOptionsDto } from '../dto/options/export/ExportProfessorsOptions.dto';
import { ExportScheduleTypesOptionsDto } from '../dto/options/export/ExportScheduleTypesOptions.dto';
import { ExportSchedulesOptionsDto } from '../dto/options/export/ExportSchedulesOptions.dto';
import { ExportSemesterCareersOptionsDto } from '../dto/options/export/ExportSemesterCareersOptions.dto';
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

    async exportCoursesAsCSV(
        exportCoursesOptionsDto: ExportCoursesOptionsDto
    ): Promise<string> {
        let output: string = '';

        let courses: Course[];

        const relations = { classroom: true };

        if (
            exportCoursesOptionsDto.courseIds &&
            exportCoursesOptionsDto.courseIds.length > 0
        ) {
            courses = await this.courseRepository.find({
                where: { id: In(exportCoursesOptionsDto.courseIds) },
                relations: relations
            });
        } else {
            courses = await this.courseRepository.find({
                relations: relations
            });
        }

        for (const course of courses) {
            output += `${course.key},${course.classroom.type},${course.schedule},${course.description}\n`;
        }

        return output;
    }

    async exportGroupsAsCSV(
        exportGroupsOptionsDto: ExportGroupsOptionsDto
    ): Promise<string> {
        let output: string = '';

        let groups: Group[];

        const relations = { course: true, professor: true };

        if (
            exportGroupsOptionsDto.groupIds &&
            exportGroupsOptionsDto.groupIds.length > 0
        ) {
            groups = await this.groupRepository.find({
                where: { id: In(exportGroupsOptionsDto.groupIds) },
                relations: relations
            });
        } else {
            groups = await this.groupRepository.find({
                relations: relations
            });
        }

        for (const group of groups) {
            output += `${group.course.key},${group.group},${group.professor.controlNumber}\n`;
        }

        return output;
    }

    async exportSemesterCareersAsCSV(
        exportSemesterCareersOptionsDto: ExportSemesterCareersOptionsDto
    ): Promise<string> {
        let output: string = '';

        let semesterCareers: SemesterCareer[];

        const relations = { career: true, course: true };

        if (
            exportSemesterCareersOptionsDto.semesterCareerIds &&
            exportSemesterCareersOptionsDto.semesterCareerIds.length > 0
        ) {
            semesterCareers = await this.semesterCareerRepository.find({
                where: {
                    id: In(exportSemesterCareersOptionsDto.semesterCareerIds)
                },
                relations: relations
            });
        } else {
            semesterCareers = await this.semesterCareerRepository.find({
                relations: relations
            });
        }

        for (const semesterCareer of semesterCareers) {
            output += `${semesterCareer.career.key}${semesterCareer.semester},${semesterCareer.course.key},${semesterCareer.start},${semesterCareer.end}\n`;
        }

        return output;
    }

    async exportProfessorsAsCSV(
        exportProfessorsOptionsDto: ExportProfessorsOptionsDto
    ): Promise<string> {
        let output: string = '';

        let professors: Professor[];

        if (
            exportProfessorsOptionsDto.professorIds &&
            exportProfessorsOptionsDto.professorIds.length > 0
        ) {
            professors = await this.professorRepository.find({
                where: { id: In(exportProfessorsOptionsDto.professorIds) }
            });
        } else {
            professors = await this.professorRepository.find();
        }

        for (const professor of professors) {
            output += `${professor.type},${professor.controlNumber},${professor.name}\n`;
        }

        return output;
    }

    async exportSchedulesAsCSV(
        exportSchedulesOptionsDto: ExportSchedulesOptionsDto
    ): Promise<string> {
        let output: string = '';

        let schedules: Schedule[];

        if (
            exportSchedulesOptionsDto.scheduleIds &&
            exportSchedulesOptionsDto.scheduleIds.length > 0
        ) {
            schedules = await this.scheduleRepository.find({
                where: { id: In(exportSchedulesOptionsDto.scheduleIds) },
                relations: { scheduleType: true }
            });
        } else {
            schedules = await this.scheduleRepository.find({
                relations: { scheduleType: true }
            });
        }

        for (const schedule of schedules) {
            output += `${schedule.type},${schedule.offset},${schedule.scheduleType.sessionMask},${schedule.scheduleType.description}\n`;
        }

        return output;
    }

    async exportScheduleTypesAsCSV(
        exportScheduleTypesOptionsDto: ExportScheduleTypesOptionsDto
    ): Promise<string> {
        let output: string = '';

        let scheduleTypes: ScheduleType[];

        if (
            exportScheduleTypesOptionsDto.scheduleTypeIds &&
            exportScheduleTypesOptionsDto.scheduleTypeIds.length > 0
        ) {
            scheduleTypes = await this.scheduleTypeRepository.find({
                where: { id: In(exportScheduleTypesOptionsDto.scheduleTypeIds) }
            });
        } else {
            scheduleTypes = await this.scheduleTypeRepository.find();
        }

        for (const scheduleType of scheduleTypes) {
            output += `${scheduleType.description},${scheduleType.availableHours},${scheduleType.sessionMask}\n`;
        }

        return output;
    }

    async exportAvailabilityScheduleProfessorsAsBinary(
        cycleId: number,
        exportAvailabilitySchedulesProfessorsOptionsDto: ExportAvailabilitySchedulesProfessorsOptionsDto
    ): Promise<StreamableFile> {
        let professors: Professor[];
        let count: number;

        if (
            exportAvailabilitySchedulesProfessorsOptionsDto.professorIds &&
            exportAvailabilitySchedulesProfessorsOptionsDto.professorIds
                .length > 0
        ) {
            const [professors1, count1] =
                await this.professorRepository.findAndCount({
                    where: {
                        id: In(
                            exportAvailabilitySchedulesProfessorsOptionsDto.professorIds
                        )
                    }
                });
            professors = professors1;
            count = count1;
        } else {
            const [professors1, count1] =
                await this.professorRepository.findAndCount();
            professors = professors1;
            count = count1;
        }

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

    async exportAvailabilityScheduleClassroomsAsBinary(
        cycleId: number,
        exportAvailabilitySchedulesClassroomsOptionsDto: ExportAvailabilitySchedulesClassroomsOptionsDto
    ): Promise<StreamableFile> {
        let classrooms: Classroom[];
        let count: number;

        if (
            exportAvailabilitySchedulesClassroomsOptionsDto.classroomIds &&
            exportAvailabilitySchedulesClassroomsOptionsDto.classroomIds
                .length > 0
        ) {
            const [classrooms1, count1] =
                await this.classroomRepository.findAndCount({
                    where: {
                        id: In(
                            exportAvailabilitySchedulesClassroomsOptionsDto.classroomIds
                        )
                    }
                });
            classrooms = classrooms1;
            count = count1;
        } else {
            const [classrooms1, count1] =
                await this.classroomRepository.findAndCount();
            classrooms = classrooms1;
            count = count1;
        }

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
