import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';

import { CourseInsertDto } from '../dto/CourseInsert.dto';
import { CourseUpdateDto } from '../dto/CourseUpdate.dto';
import { CourseUpdateBulkDto } from '../dto/CourseUpdateBulk.dto';
import { CourseOptionsDto } from '../dto/options/CourseOptions.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { CourseService } from '../services/Course.service';

@Controller({ path: 'courses', version: '1' })
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(
        @Query() courseOptionsDto: CourseOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.courseService.getAll(
            courseOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number,
        @Query() courseOptionsDto: CourseOptionsDto
    ) {
        return await this.courseService.getById(id, courseOptionsDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() courseInsertDto: CourseInsertDto) {
        return await this.courseService.insert(courseInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() courseInsertDtos: CourseInsertDto[]) {
        return await this.courseService.insertMany(courseInsertDtos);
    }

    @Patch('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() courseUpdateDto: CourseUpdateDto
    ) {
        return await this.courseService.update(id, courseUpdateDto);
    }

    @Patch('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(@Body() courseUpdateBulkDtos: CourseUpdateBulkDto[]) {
        return await this.courseService.updateMany(courseUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.courseService.delete(Number(id));
    }
}
