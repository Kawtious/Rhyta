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

import { Permissions } from '../decorators/Permissions.decorator';
import { ScheduleEntryInsertDto } from '../dto/ScheduleEntryInsert.dto';
import { ScheduleEntryUpdateDto } from '../dto/ScheduleEntryUpdate.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Permission } from '../enums/Permission.enum';
import { ScheduleEntryService } from '../services/ScheduleEntry.service';

@Controller({ path: 'scheduleEntries', version: '1' })
export class ScheduleEntryController {
    constructor(private readonly scheduleEntryService: ScheduleEntryService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.scheduleEntryService.getAll(pageOptionsDto);
    }

    @Get('search/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
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
    @Permissions(Permission.Admin)
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
    @Permissions(Permission.Admin)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.scheduleEntryService.getById(id);
    }

    @Post('insert/professor/:professorId')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insertByProfessorId(
        @Param('professorId')
        professorId: number,
        @Body() scheduleEntryInsertDto: ScheduleEntryInsertDto
    ) {
        return await this.scheduleEntryService.insertByProfessorId(
            professorId,
            scheduleEntryInsertDto
        );
    }

    @Post('insert/classroom/:classroomId')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insertByClassroomId(
        @Param('classroomId')
        classroomId: number,
        @Body() scheduleEntryInsertDto: ScheduleEntryInsertDto
    ) {
        return await this.scheduleEntryService.insertByClassroomId(
            classroomId,
            scheduleEntryInsertDto
        );
    }

    @Put('update/cycle/professor/:cycleId/:professorId/:day/:hour')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
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
    @Permissions(Permission.Admin)
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
}
