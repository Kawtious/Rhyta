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
import { ProfessorInsertDto } from '../dto/ProfessorInsert.dto';
import { ProfessorUpdateDto } from '../dto/ProfessorUpdate.dto';
import { ProfessorUpdateBulkDto } from '../dto/ProfessorUpdateBulk.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ProfessorService } from '../services/Professor.service';

@Controller({ path: 'professors', version: '1' })
export class ProfessorController {
    constructor(private readonly professorService: ProfessorService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.professorService.getAll();
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

        return await this.professorService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insert(@Body() professorInsertDto: ProfessorInsertDto) {
        return await this.professorService.insert(professorInsertDto);
    }

    @Post('bulk')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insertBulk(@Body() professorInsertDtos: ProfessorInsertDto[]) {
        return await this.professorService.insertBulk(professorInsertDtos);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param('id')
        id: string,
        @Body() professorUpdateDto: ProfessorUpdateDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorService.update(
            Number(id),
            professorUpdateDto
        );
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async updateBulk(
        @Body() professorUpdateBulkDtos: ProfessorUpdateBulkDto[]
    ) {
        return await this.professorService.updateBulk(professorUpdateBulkDtos);
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

        await this.professorService.delete(Number(id));

        return;
    }
}
