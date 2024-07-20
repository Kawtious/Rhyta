import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { SemesterCareerInsertDto } from '../dto/SemesterCareerInsert.dto';
import { SemesterCareerOptionsDto } from '../dto/SemesterCareerOptions.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { SemesterCareer } from '../entities/SemesterCareer.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';

@Injectable()
export class SemesterCareerService {
    constructor(
        @InjectRepository(Career, 'mySqlConnection')
        private readonly careerRepository: Repository<Career>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(SemesterCareer, 'mySqlConnection')
        private readonly semesterCareerRepository: Repository<SemesterCareer>
    ) {}

    async getAll(
        semesterCareerOptionsDto: SemesterCareerOptionsDto,
        pageOptionsDto: PageOptionsDto
    ): Promise<PageDto<SemesterCareer>> {
        const [semesterCareers, count] =
            await this.semesterCareerRepository.findAndCount({
                relations: {
                    career: semesterCareerOptionsDto.includeCareer,
                    course: semesterCareerOptionsDto.includeCourse
                },
                order: { id: { direction: pageOptionsDto.order } },
                skip: pageOptionsDto.skip,
                take: pageOptionsDto.take
            });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(semesterCareers, pageMetaDto);
    }

    async getById(
        id: number,
        semesterCareerOptionsDto: SemesterCareerOptionsDto
    ): Promise<SemesterCareer> {
        const semesterCareer = await this.semesterCareerRepository.findOne({
            relations: {
                career: semesterCareerOptionsDto.includeCareer,
                course: semesterCareerOptionsDto.includeCourse
            },
            where: {
                id: id
            }
        });

        if (!semesterCareer) {
            throw new EntityNotFoundError('SemesterCareer not found');
        }

        return semesterCareer;
    }

    async insert(
        semesterCareerInsertDto: SemesterCareerInsertDto
    ): Promise<SemesterCareer> {
        const career = await this.careerRepository.findOneBy({
            id: semesterCareerInsertDto.careerId
        });

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        const course = await this.courseRepository.findOneBy({
            id: semesterCareerInsertDto.courseId
        });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        const semesterCareer = new SemesterCareer();

        semesterCareer.career = career;
        semesterCareer.course = course;
        semesterCareer.semester = semesterCareerInsertDto.semester;
        semesterCareer.start = semesterCareerInsertDto.start;
        semesterCareer.end = semesterCareerInsertDto.end;

        return await this.semesterCareerRepository.save(semesterCareer);
    }

    async insertMany(
        semesterCareerInsertDtos: SemesterCareerInsertDto[]
    ): Promise<SemesterCareer[]> {
        const semesterCareers: SemesterCareer[] = [];

        for (const semesterCareerInsertDto of semesterCareerInsertDtos) {
            const career = await this.careerRepository.findOneBy({
                id: semesterCareerInsertDto.careerId
            });

            if (!career) {
                throw new EntityNotFoundError('Career not found');
            }

            const course = await this.courseRepository.findOneBy({
                id: semesterCareerInsertDto.courseId
            });

            if (!course) {
                throw new EntityNotFoundError('Course not found');
            }

            const semesterCareer = new SemesterCareer();

            semesterCareer.career = career;
            semesterCareer.course = course;
            semesterCareer.semester = semesterCareerInsertDto.semester;
            semesterCareer.start = semesterCareerInsertDto.start;
            semesterCareer.end = semesterCareerInsertDto.end;

            semesterCareers.push(semesterCareer);
        }

        return await this.semesterCareerRepository.save(semesterCareers);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.semesterCareerRepository.delete(id);
    }
}
