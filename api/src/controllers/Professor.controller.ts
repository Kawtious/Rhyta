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

import { ProfessorInsertDto } from '../dto/ProfessorInsert.dto';
import { ProfessorUpdateDto } from '../dto/ProfessorUpdate.dto';
import { ProfessorUpdateBulkDto } from '../dto/ProfessorUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ProfessorService } from '../services/Professor.service';

@Controller({ path: 'professors', version: '1' })
export class ProfessorController {
    constructor(private readonly professorService: ProfessorService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.professorService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.professorService.getById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() professorInsertDto: ProfessorInsertDto) {
        return await this.professorService.insert(professorInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() professorInsertDtos: ProfessorInsertDto[]) {
        return await this.professorService.insertMany(professorInsertDtos);
    }

    @Put('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() professorUpdateDto: ProfessorUpdateDto
    ) {
        return await this.professorService.update(id, professorUpdateDto);
    }

    @Put('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(
        @Body() professorUpdateBulkDtos: ProfessorUpdateBulkDto[]
    ) {
        return await this.professorService.updateMany(professorUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.professorService.delete(Number(id));
    }
}
