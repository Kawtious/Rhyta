import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { Professor } from '../entities/Professor.entity';
import { Program } from '../entities/Program.entity';
import { ProgramType } from '../entities/ProgramType.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';

@Injectable()
export class ExportService {
    constructor(
        @InjectRepository(Career, 'mySqlConnection')
        private readonly careerRepository: Repository<Career>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Group, 'mySqlConnection')
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(Professor, 'mySqlConnection')
        private readonly professorRepository: Repository<Professor>,
        @InjectRepository(Program, 'mySqlConnection')
        private readonly programRepository: Repository<Program>,
        @InjectRepository(ProgramType, 'mySqlConnection')
        private readonly programTypeRepository: Repository<ProgramType>
    ) {}

    async exportCSVCareers(): Promise<string> {
        let output: string = '';

        const careers = await this.careerRepository.find({
            relations: { courses: true }
        });

        for (const career of careers) {
            for (const course of career.courses) {
                output += `${career.careerKey},${course.courseKey},${career.pathStartKey},${career.pathEndKey}`;
            }
        }

        return output;
    }

    async exportCSVCareer(id: number, courseIndex?: number): Promise<string> {
        const career = await this.careerRepository.findOne({
            where: { id: id },
            relations: { courses: true }
        });

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        if (!courseIndex) {
            let output: string = '';

            for (const course of career.courses) {
                output += `${career.careerKey},${course.courseKey},${career.pathStartKey},${career.pathEndKey}`;
            }

            return output;
        }

        return `${career.careerKey},${career.courses[courseIndex].courseKey},${career.pathStartKey},${career.pathEndKey}`;
    }

    async exportCSVCourses(): Promise<string> {
        let output: string = '';

        const courses = await this.courseRepository.find();

        for (const course of courses) {
            output += `${course.courseKey},${course.classKey},${course.scheduleKey},${course.descriptionKey}`;
        }

        return output;
    }

    async exportCSVCourse(id: number): Promise<string> {
        const course = await this.courseRepository.findOne({
            where: { id: id }
        });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        return `${course.courseKey},${course.classKey},${course.scheduleKey},${course.descriptionKey}`;
    }

    async exportCSVGroups(): Promise<string> {
        let output: string = '';

        const groups = await this.groupRepository.find();

        for (const group of groups) {
            output += `${group.course.courseKey},${group.firstNumberKey},${group.secondNumberKey}`;
        }

        return output;
    }

    async exportCSVGroup(id: number): Promise<string> {
        const group = await this.groupRepository.findOne({
            where: { id: id }
        });

        if (!group) {
            throw new EntityNotFoundError('Group not found');
        }

        return `${group.course.courseKey},${group.firstNumberKey},${group.secondNumberKey}`;
    }

    async exportCSVProfessors(): Promise<string> {
        let output: string = '';

        const professors = await this.professorRepository.find();

        for (const professor of professors) {
            output += `${professor.typeKey},${professor.controlNumberKey},${professor.name}`;
        }

        return output;
    }

    async exportCSVProfessor(id: number): Promise<string> {
        const professor = await this.professorRepository.findOne({
            where: { id: id }
        });

        if (!professor) {
            throw new EntityNotFoundError('Professor not found');
        }

        return `${professor.typeKey},${professor.controlNumberKey},${professor.name}`;
    }

    async exportCSVPrograms(): Promise<string> {
        let output: string = '';

        const programs = await this.programRepository.find();

        for (const program of programs) {
            output += `${program.typeKey},${program.offsetKey},${program.programType.sessionMaskKey},${program.programType.descriptionKey}`;
        }

        return output;
    }

    async exportCSVProgram(id: number): Promise<string> {
        const program = await this.programRepository.findOne({
            where: { id: id }
        });

        if (!program) {
            throw new EntityNotFoundError('Program not found');
        }

        return `${program.typeKey},${program.offsetKey},${program.programType.sessionMaskKey},${program.programType.descriptionKey}`;
    }

    async exportCSVProgramTypes(): Promise<string> {
        let output: string = '';

        const programTypes = await this.programTypeRepository.find();

        for (const programType of programTypes) {
            output += `${programType.descriptionKey},${programType.availableHoursKey},${programType.sessionMaskKey}`;
        }

        return output;
    }

    async exportCSVProgramType(id: number): Promise<string> {
        const programType = await this.programTypeRepository.findOneBy({
            id: id
        });

        if (!programType) {
            throw new EntityNotFoundError('ProgramType not found');
        }

        return `${programType.descriptionKey},${programType.availableHoursKey},${programType.sessionMaskKey}`;
    }
}
