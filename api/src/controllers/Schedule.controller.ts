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

import { ScheduleInsertDto } from '../dto/ScheduleInsert.dto';
import { ScheduleUpdateDto } from '../dto/ScheduleUpdate.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ScheduleService } from '../services/Schedule.service';

@Controller({ path: 'schedules', version: '1' })
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.scheduleService.getAll(pageOptionsDto);
    }

    @Get('search/professor/:professorId')
    @HttpCode(HttpStatus.OK)
    async getAllByProfessorId(
        @Param('professorId')
        professorId: number,
        @Query()
        pageOptionsDto: PageOptionsDto
    ) {
        return await this.scheduleService.getAllByProfessorId(
            professorId,
            pageOptionsDto
        );
    }

    @Get('search/classroom/:classroomId')
    @HttpCode(HttpStatus.OK)
    async getAllByClassroomId(
        @Param('classroomId')
        classroomId: number,
        @Query()
        pageOptionsDto: PageOptionsDto
    ) {
        return await this.scheduleService.getAllByClassroomId(
            classroomId,
            pageOptionsDto
        );
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.scheduleService.getById(id);
    }

    @Get('search/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async getByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId') professorId: number
    ) {
        return await this.scheduleService.getByCycleIdAndProfessorId(
            cycleId,
            professorId
        );
    }

    @Get('search/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async getByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId') classroomId: number
    ) {
        return await this.scheduleService.getByCycleIdAndClassroomId(
            cycleId,
            classroomId
        );
    }

    @Post('insert/professor/:professorId')
    @HttpCode(HttpStatus.CREATED)
    async insertByProfessorId(
        @Param('professorId')
        professorId: number,
        @Body() scheduleInsertDto: ScheduleInsertDto
    ) {
        return await this.scheduleService.insertByProfessorId(
            professorId,
            scheduleInsertDto
        );
    }

    @Post('insert/classroom/:classroomId')
    @HttpCode(HttpStatus.CREATED)
    async insertByClassroomId(
        @Param('classroomId')
        classroomId: number,
        @Body() scheduleInsertDto: ScheduleInsertDto
    ) {
        return await this.scheduleService.insertByClassroomId(
            classroomId,
            scheduleInsertDto
        );
    }

    @Put('update/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async updateByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body() scheduleUpdateDto: ScheduleUpdateDto
    ) {
        return await this.scheduleService.updateByCycleIdAndProfessorId(
            cycleId,
            professorId,
            scheduleUpdateDto
        );
    }

    @Put('update/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body() scheduleUpdateDto: ScheduleUpdateDto
    ) {
        return await this.scheduleService.updateByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            scheduleUpdateDto
        );
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.scheduleService.delete(Number(id));
    }
}
