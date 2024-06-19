import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';

import { ScheduleEntryInsertDto } from '../dto/ScheduleEntryInsert.dto';
import { ScheduleEntryUpdateDto } from '../dto/ScheduleEntryUpdate.dto';
import { ScheduleEntryUpdateBulkDto } from '../dto/ScheduleEntryUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ScheduleEntryService } from '../services/ScheduleEntry.service';

@Controller({ path: 'scheduleEntries', version: '1' })
export class ScheduleEntryController {
    constructor(private readonly scheduleEntryService: ScheduleEntryService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.scheduleEntryService.getAll(pageOptionsDto);
    }

    @Get('search/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async getAllByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Query()
        pageOptionsDto: PageOptionsDto
    ) {
        return await this.scheduleEntryService.getAllByCycleIdAndProfessorId(
            cycleId,
            professorId,
            pageOptionsDto
        );
    }

    @Get('search/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async getAllByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Query()
        pageOptionsDto: PageOptionsDto
    ) {
        return await this.scheduleEntryService.getAllByCycleIdAndClassroomId(
            cycleId,
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
        return await this.scheduleEntryService.getById(id);
    }

    @Post('insert/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.CREATED)
    async insertByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body() scheduleEntryInsertDto: ScheduleEntryInsertDto
    ) {
        return await this.scheduleEntryService.insertByCycleIdAndProfessorId(
            cycleId,
            professorId,
            scheduleEntryInsertDto
        );
    }

    @Post('insert/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.CREATED)
    async insertByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body() scheduleEntryInsertDto: ScheduleEntryInsertDto
    ) {
        return await this.scheduleEntryService.insertByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            scheduleEntryInsertDto
        );
    }

    @Post('insert/many/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.CREATED)
    async insertManyByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body() scheduleEntryInsertDtos: ScheduleEntryInsertDto[]
    ) {
        return await this.scheduleEntryService.insertManyByCycleIdAndProfessorId(
            cycleId,
            professorId,
            scheduleEntryInsertDtos
        );
    }

    @Post('insert/many/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.CREATED)
    async insertManyByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body() scheduleEntryInsertDtos: ScheduleEntryInsertDto[]
    ) {
        return await this.scheduleEntryService.insertManyByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            scheduleEntryInsertDtos
        );
    }

    @Put('update/cycle/professor/:cycleId/:professorId/:day/:hour')
    @HttpCode(HttpStatus.OK)
    async updateByCycleIdAndProfessorIdAndDayAndHour(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Param('day')
        day: number,
        @Param('hour')
        hour: number,
        @Body() scheduleEntryUpdateDto: ScheduleEntryUpdateDto
    ) {
        return await this.scheduleEntryService.updateByCycleIdAndProfessorIdAndDayAndHour(
            cycleId,
            professorId,
            day,
            hour,
            scheduleEntryUpdateDto
        );
    }

    @Put('update/cycle/classroom/:cycleId/:classroomId/:day/:hour')
    @HttpCode(HttpStatus.OK)
    async updateByCycleIdAndClassroomIdAndDayAndHour(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Param('day')
        day: number,
        @Param('hour')
        hour: number,
        @Body() scheduleEntryUpdateDto: ScheduleEntryUpdateDto
    ) {
        return await this.scheduleEntryService.updateByCycleIdAndClassroomIdAndDayAndHour(
            cycleId,
            classroomId,
            day,
            hour,
            scheduleEntryUpdateDto
        );
    }

    @Put('update/many/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async updateManyByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body() scheduleEntryUpdateBulkDtos: ScheduleEntryUpdateBulkDto[]
    ) {
        return await this.scheduleEntryService.updateManyByCycleIdAndProfessorId(
            cycleId,
            professorId,
            scheduleEntryUpdateBulkDtos
        );
    }

    @Put('update/many/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async updateManyByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body() scheduleEntryUpdateBulkDtos: ScheduleEntryUpdateBulkDto[]
    ) {
        return await this.scheduleEntryService.updateManyByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            scheduleEntryUpdateBulkDtos
        );
    }
}
