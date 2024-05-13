import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { PathInsertDto } from '../dto/PathInsert.dto';
import { PageDto } from '../dto/pagination/Page.dto';
import { PageMetaDto } from '../dto/pagination/PageMeta.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { Path } from '../entities/Path.entity';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';

@Injectable()
export class PathService {
    constructor(
        @InjectRepository(Career, 'mySqlConnection')
        private readonly careerRepository: Repository<Career>,
        @InjectRepository(Course, 'mySqlConnection')
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Path, 'mySqlConnection')
        private readonly pathRepository: Repository<Path>
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Path>> {
        const [paths, count] = await this.pathRepository.findAndCount({
            order: { id: { direction: pageOptionsDto.order } },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto
        });

        return new PageDto(paths, pageMetaDto);
    }

    async getById(id: number): Promise<Path> {
        const path = await this.pathRepository.findOneBy({ id: id });

        if (!path) {
            throw new EntityNotFoundError('Path not found');
        }

        return path;
    }

    async insert(pathInsertDto: PathInsertDto): Promise<Path> {
        const path = new Path();

        const career = await this.careerRepository.findOneBy({
            id: pathInsertDto.careerId
        });

        if (!career) {
            throw new EntityNotFoundError('Career not found');
        }

        const course = await this.courseRepository.findOneBy({
            id: pathInsertDto.courseId
        });

        if (!course) {
            throw new EntityNotFoundError('Course not found');
        }

        path.career = career;
        path.course = course;
        path.pathStartKey = pathInsertDto.pathStartKey;
        path.pathEndKey = pathInsertDto.pathEndKey;

        return await this.pathRepository.save(path);
    }

    async insertMany(pathInsertDtos: PathInsertDto[]): Promise<Path[]> {
        const paths: Path[] = [];

        for (const pathInsertDto of pathInsertDtos) {
            const path = new Path();

            const career = await this.careerRepository.findOneBy({
                id: pathInsertDto.careerId
            });

            if (!career) {
                throw new EntityNotFoundError('Career not found');
            }

            const course = await this.courseRepository.findOneBy({
                id: pathInsertDto.courseId
            });

            if (!course) {
                throw new EntityNotFoundError('Course not found');
            }

            path.career = career;
            path.course = course;
            path.pathStartKey = pathInsertDto.pathStartKey;
            path.pathEndKey = pathInsertDto.pathEndKey;

            paths.push(path);
        }

        return await this.pathRepository.save(paths);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.pathRepository.delete(id);
    }
}
