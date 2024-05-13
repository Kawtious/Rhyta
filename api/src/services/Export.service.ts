import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Classroom } from '../entities/Classroom.entity';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { Path } from '../entities/Path.entity';
import { Professor } from '../entities/Professor.entity';
import { Program } from '../entities/Program.entity';
import { ProgramType } from '../entities/ProgramType.entity';
import { Schedule } from '../entities/Schedule.entity';
import { HexConverter } from '../utils/HexConverter';

@Injectable()
export class ExportService {
    constructor(
        @InjectRepository(Classroom, 'mySqlConnection')
        private readonly classroomRepository: Repository<Classroom>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Group, 'mySqlConnection')
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(Path, 'mySqlConnection')
        private readonly pathRepository: Repository<Path>,
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>,
        @InjectRepository(Program, 'mySqlConnection')
        private readonly programRepository: Repository<Program>,
        @InjectRepository(ProgramType, 'mySqlConnection')
        private readonly programTypeRepository: Repository<ProgramType>,
        @InjectRepository(Schedule, 'mySqlConnection')
        private readonly scheduleRepository: Repository<Schedule>
    ) {}

    async exportCSVCourses(): Promise<string> {
        let output: string = '';

        const courses = await this.courseRepository.find({
            relations: { classroom: true }
        });

        for (const course of courses) {
            output += `${course.courseKey},${course.classroom.typeKey},${course.scheduleKey},${course.descriptionKey}\n`;
        }

        return output;
    }

    async exportCSVGroups(): Promise<string> {
        let output: string = '';

        const groups = await this.groupRepository.find({
            relations: { course: true }
        });

        for (const group of groups) {
            output += `${group.course.courseKey},${group.firstNumberKey},${group.secondNumberKey}\n`;
        }

        return output;
    }

    async exportCSVPaths(): Promise<string> {
        let output: string = '';

        const paths = await this.pathRepository.find({
            relations: { career: true, course: true }
        });

        for (const path of paths) {
            output += `${path.career.careerKey},${path.course.courseKey},${path.pathStartKey},${path.pathEndKey}\n`;
        }

        return output;
    }

    async exportCSVProfessors(): Promise<string> {
        let output: string = '';

        const professors = await this.professorRepository.find();

        for (const professor of professors) {
            output += `${professor.typeKey},${professor.controlNumberKey},${professor.name}\n`;
        }

        return output;
    }

    async exportCSVPrograms(): Promise<string> {
        let output: string = '';

        const programs = await this.programRepository.find({
            relations: { programType: true }
        });

        for (const program of programs) {
            output += `${program.typeKey},${program.offsetKey},${program.programType.sessionMaskKey},${program.programType.descriptionKey}\n`;
        }

        return output;
    }

    async exportCSVProgramTypes(): Promise<string> {
        let output: string = '';

        const programTypes = await this.programTypeRepository.find();

        for (const programType of programTypes) {
            output += `${programType.descriptionKey},${programType.availableHoursKey},${programType.sessionMaskKey}\n`;
        }

        return output;
    }

    async exportHexProfessors(cycleId: number): Promise<StreamableFile> {
        const [professors, count] =
            await this.professorRepository.findAndCount();

        let hex: string = HexConverter.numberToPaddedHex(count, 4, true);

        for (const professor of professors) {
            const schedule = await this.scheduleRepository.findOne({
                relations: { entries: true },
                where: {
                    cycle: { id: cycleId },
                    professor: { id: professor.id }
                }
            });

            if (schedule == null) {
                continue;
            }

            hex += HexConverter.stringToPaddedHex(professor.typeKey, 4);
            hex += HexConverter.numberToPaddedHex(
                professor.controlNumberKey,
                4,
                true
            );
            hex += HexConverter.stringToHexWithNullTerminator(professor.name);

            const scheduleBytes: string[][] = [];

            for (let i = 0; i < 6; i++) {
                scheduleBytes[i] = [];
                for (let j = 0; j < 29; j++) {
                    scheduleBytes[i][j] = HexConverter.getEmptyBytes(4);
                }
            }

            for (const scheduleEntry of schedule.entries) {
                scheduleBytes[scheduleEntry.day][scheduleEntry.hour] =
                    HexConverter.booleanToHex(scheduleEntry.active, 4, false);
            }

            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 28; j++) {
                    hex += scheduleBytes[i][j];
                }
            }
        }

        return new StreamableFile(Buffer.from(hex, 'hex'));
    }

    async exportHexClassrooms(cycleId: number): Promise<StreamableFile> {
        const [classrooms, count] =
            await this.classroomRepository.findAndCount();

        let hex: string = HexConverter.numberToPaddedHex(count, 4, true);

        for (const classroom of classrooms) {
            const schedule = await this.scheduleRepository.findOne({
                relations: { entries: true },
                where: {
                    classroom: { id: classroom.id },
                    cycle: { id: cycleId }
                }
            });

            if (schedule == null) {
                continue;
            }

            hex += HexConverter.stringToPaddedHex(classroom.typeKey, 4);

            const scheduleBytes: string[][] = [];

            for (let i = 0; i < 6; i++) {
                scheduleBytes[i] = [];
                for (let j = 0; j < 29; j++) {
                    scheduleBytes[i][j] = HexConverter.getEmptyBytes(4);
                }
            }

            for (const scheduleEntry of schedule.entries) {
                scheduleBytes[scheduleEntry.day][scheduleEntry.hour] =
                    HexConverter.booleanToHex(scheduleEntry.active, 4, false);
            }

            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 29; j++) {
                    hex += scheduleBytes[i][j];
                }
            }
        }

        return new StreamableFile(Buffer.from(hex, 'hex'));
    }
}
