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

import { ClassroomInsertDto } from '../dto/ClassroomInsert.dto';
import { ClassroomUpdateDto } from '../dto/ClassroomUpdate.dto';
import { ClassroomUpdateBulkDto } from '../dto/ClassroomUpdateBulk.dto';
import { ClassroomOptionsDto } from '../dto/options/ClassroomOptions.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ClassroomService } from '../services/Classroom.service';

@Controller({ path: 'classrooms', version: '1' })
export class ClassroomController {
    constructor(private readonly classroomService: ClassroomService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(
        @Query() classroomOptionsDto: ClassroomOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.classroomService.getAll(
            classroomOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number,
        @Query() classroomOptionsDto: ClassroomOptionsDto
    ) {
        return await this.classroomService.getById(id, classroomOptionsDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() classroomInsertDto: ClassroomInsertDto) {
        return await this.classroomService.insert(classroomInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() classroomInsertDtos: ClassroomInsertDto[]) {
        return await this.classroomService.insertMany(classroomInsertDtos);
    }

    @Patch('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() classroomUpdateDto: ClassroomUpdateDto
    ) {
        return await this.classroomService.update(id, classroomUpdateDto);
    }

    @Patch('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(
        @Body() classroomUpdateBulkDtos: ClassroomUpdateBulkDto[]
    ) {
        return await this.classroomService.updateMany(classroomUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.classroomService.delete(id);
    }
}
