import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';

import { Permissions } from '../decorators/Permissions.decorator';
import { ClassroomInsertDto } from '../dto/ClassroomInsert.dto';
import { ClassroomUpdateDto } from '../dto/ClassroomUpdate.dto';
import { ClassroomUpdateBulkDto } from '../dto/ClassroomUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Permission } from '../entities/Role.entity';
import { ClassroomService } from '../services/Classroom.service';

@Controller({ path: 'classrooms', version: '1' })
export class ClassroomController {
    constructor(private readonly classroomService: ClassroomService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.classroomService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.classroomService.getById(id);
    }

    // @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insert(@Body() classroomInsertDto: ClassroomInsertDto) {
        return await this.classroomService.insert(classroomInsertDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insertMany(@Body() classroomInsertDtos: ClassroomInsertDto[]) {
        return await this.classroomService.insertMany(classroomInsertDtos);
    }

    @Put('update/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async update(
        @Param('id')
        id: number,
        @Body() classroomUpdateDto: ClassroomUpdateDto
    ) {
        return await this.classroomService.update(id, classroomUpdateDto);
    }

    @Put('update/many')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async updateMany(
        @Body() classroomUpdateBulkDtos: ClassroomUpdateBulkDto[]
    ) {
        return await this.classroomService.updateMany(classroomUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(Permission.Admin)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.classroomService.delete(id);
    }
}
