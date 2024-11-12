import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { SemesterCareerInsertDto } from '../dto/SemesterCareerInsert.dto';
import { SemesterCareerUpdateDto } from '../dto/SemesterCareerUpdate.dto';
import { SemesterCareerOptionsDto } from '../dto/options/SemesterCareerOptions.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { SemesterCareer } from '../entities/SemesterCareer.entity';
import { EntityNotFoundError } from '../errors/EntityNotFound.error';
import { OptimisticLockingFailureError } from '../errors/OptimisticLockingFailure.error';

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

    async search(
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

    async searchById(
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

    async updateById(
        id: number,
        semesterCareerUpdateDto: SemesterCareerUpdateDto
    ): Promise<SemesterCareer> {
        const existingSemesterCareer =
            await this.semesterCareerRepository.findOneBy({
                id: id
            });

        if (!existingSemesterCareer) {
            throw new EntityNotFoundError('SemesterCareer not found');
        }

        if (semesterCareerUpdateDto.version == null) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSemesterCareer.version,
                -1
            );
        }

        if (
            semesterCareerUpdateDto.version !== existingSemesterCareer.version
        ) {
            throw new OptimisticLockingFailureError(
                'Resource versions do not match',
                existingSemesterCareer.version,
                semesterCareerUpdateDto.version
            );
        }

        if (semesterCareerUpdateDto.careerId != null) {
            const career = await this.careerRepository.findOneBy({
                id: semesterCareerUpdateDto.careerId
            });

            if (!career) {
                throw new EntityNotFoundError('Career not found');
            }

            existingSemesterCareer.career = career;
        }

        if (semesterCareerUpdateDto.courseId != null) {
            const course = await this.courseRepository.findOneBy({
                id: semesterCareerUpdateDto.courseId
            });

            if (!course) {
                throw new EntityNotFoundError('Course not found');
            }

            existingSemesterCareer.course = course;
        }

        if (semesterCareerUpdateDto.semester != null) {
            existingSemesterCareer.semester = semesterCareerUpdateDto.semester;
        }

        if (semesterCareerUpdateDto.start != null) {
            existingSemesterCareer.start = semesterCareerUpdateDto.start;
        }

        if (semesterCareerUpdateDto.end != null) {
            existingSemesterCareer.end = semesterCareerUpdateDto.end;
        }

        return await this.semesterCareerRepository.save(existingSemesterCareer);
    }

    async updateMany(
        semesterCareerUpdateDtos: SemesterCareerUpdateDto[]
    ): Promise<SemesterCareer[]> {
        const semesterCareers: SemesterCareer[] = [];

        for (const semesterCareerUpdateDto of semesterCareerUpdateDtos) {
            const existingSemesterCareer =
                await this.semesterCareerRepository.findOneBy({
                    id: semesterCareerUpdateDto.id
                });

            if (!existingSemesterCareer) {
                throw new EntityNotFoundError('SemesterCareer not found');
            }

            if (semesterCareerUpdateDto.version == null) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingSemesterCareer.version,
                    -1
                );
            }

            if (
                semesterCareerUpdateDto.version !==
                existingSemesterCareer.version
            ) {
                throw new OptimisticLockingFailureError(
                    'Resource versions do not match',
                    existingSemesterCareer.version,
                    semesterCareerUpdateDto.version
                );
            }

            if (semesterCareerUpdateDto.careerId != null) {
                const career = await this.careerRepository.findOneBy({
                    id: semesterCareerUpdateDto.careerId
                });

                if (!career) {
                    throw new EntityNotFoundError('Career not found');
                }

                existingSemesterCareer.career = career;
            }

            if (semesterCareerUpdateDto.courseId != null) {
                const course = await this.courseRepository.findOneBy({
                    id: semesterCareerUpdateDto.courseId
                });

                if (!course) {
                    throw new EntityNotFoundError('Course not found');
                }

                existingSemesterCareer.course = course;
            }

            if (semesterCareerUpdateDto.semester != null) {
                existingSemesterCareer.semester =
                    semesterCareerUpdateDto.semester;
            }

            if (semesterCareerUpdateDto.start != null) {
                existingSemesterCareer.start = semesterCareerUpdateDto.start;
            }

            if (semesterCareerUpdateDto.end != null) {
                existingSemesterCareer.end = semesterCareerUpdateDto.end;
            }
        }

        return await this.semesterCareerRepository.save(semesterCareers);
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return await this.semesterCareerRepository.delete(id);
    }
}
