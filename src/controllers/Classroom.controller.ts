import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put
} from '@nestjs/common';

import { Roles } from '../decorators/Roles.decorator';
import { ClassroomInsertDto } from '../dto/ClassroomInsert.dto';
import { ClassroomUpdateDto } from '../dto/ClassroomUpdate.dto';
import { ClassroomUpdateBulkDto } from '../dto/ClassroomUpdateBulk.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ClassroomService } from '../services/Classroom.service';

@Controller({ path: 'classrooms', version: '1' })
export class ClassroomController {
    constructor(private readonly classroomService: ClassroomService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.classroomService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getById(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.classroomService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insert(@Body() classroomInsertDto: ClassroomInsertDto) {
        return await this.classroomService.insert(classroomInsertDto);
    }

    @Post('bulk')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insertBulk(@Body() classroomInsertDtos: ClassroomInsertDto[]) {
        return await this.classroomService.insertBulk(classroomInsertDtos);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param('id')
        id: string,
        @Body() classroomUpdateDto: ClassroomUpdateDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.classroomService.update(
            Number(id),
            classroomUpdateDto
        );
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async updateBulk(
        @Body() classroomUpdateBulkDtos: ClassroomUpdateBulkDto[]
    ) {
        return await this.classroomService.updateBulk(classroomUpdateBulkDtos);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    async delete(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        await this.classroomService.delete(Number(id));

        return;
    }
}
