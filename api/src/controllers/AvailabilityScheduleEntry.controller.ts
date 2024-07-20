import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';

import { AvailabilityScheduleEntryInsertDto } from '../dto/AvailabilityScheduleEntryInsert.dto';
import { AvailabilityScheduleEntryUpdateDto } from '../dto/AvailabilityScheduleEntryUpdate.dto';
import { AvailabilityScheduleEntryUpdateBulkDto } from '../dto/AvailabilityScheduleEntryUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { AvailabilityScheduleEntryService } from '../services/AvailabilityScheduleEntry.service';

@Controller({ path: 'availability-schedule-entries', version: '1' })
export class AvailabilityScheduleEntryController {
    constructor(
        private readonly availabilityScheduleEntryService: AvailabilityScheduleEntryService
    ) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.availabilityScheduleEntryService.getAll(
            pageOptionsDto
        );
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
        return await this.availabilityScheduleEntryService.getAllByCycleIdAndProfessorId(
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
        return await this.availabilityScheduleEntryService.getAllByCycleIdAndClassroomId(
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
        return await this.availabilityScheduleEntryService.getById(id);
    }

    @Post('insert/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.CREATED)
    async insertByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body()
        availabilityScheduleEntryInsertDto: AvailabilityScheduleEntryInsertDto
    ) {
        return await this.availabilityScheduleEntryService.insertByCycleIdAndProfessorId(
            cycleId,
            professorId,
            availabilityScheduleEntryInsertDto
        );
    }

    @Post('insert/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.CREATED)
    async insertByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body()
        availabilityScheduleEntryInsertDto: AvailabilityScheduleEntryInsertDto
    ) {
        return await this.availabilityScheduleEntryService.insertByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            availabilityScheduleEntryInsertDto
        );
    }

    @Post('insert/many/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.CREATED)
    async insertManyByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body()
        availabilityScheduleEntryInsertDtos: AvailabilityScheduleEntryInsertDto[]
    ) {
        return await this.availabilityScheduleEntryService.insertManyByCycleIdAndProfessorId(
            cycleId,
            professorId,
            availabilityScheduleEntryInsertDtos
        );
    }

    @Post('insert/many/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.CREATED)
    async insertManyByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body()
        availabilityScheduleEntryInsertDtos: AvailabilityScheduleEntryInsertDto[]
    ) {
        return await this.availabilityScheduleEntryService.insertManyByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            availabilityScheduleEntryInsertDtos
        );
    }

    @Patch('update/cycle/professor/:cycleId/:professorId/:day/:hour')
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
        @Body()
        availabilityScheduleEntryUpdateDto: AvailabilityScheduleEntryUpdateDto
    ) {
        return await this.availabilityScheduleEntryService.updateByCycleIdAndProfessorIdAndDayAndHour(
            cycleId,
            professorId,
            day,
            hour,
            availabilityScheduleEntryUpdateDto
        );
    }

    @Patch('update/cycle/classroom/:cycleId/:classroomId/:day/:hour')
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
        @Body()
        availabilityScheduleEntryUpdateDto: AvailabilityScheduleEntryUpdateDto
    ) {
        return await this.availabilityScheduleEntryService.updateByCycleIdAndClassroomIdAndDayAndHour(
            cycleId,
            classroomId,
            day,
            hour,
            availabilityScheduleEntryUpdateDto
        );
    }

    @Patch('update/many/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async updateManyByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body()
        availabilityScheduleEntryUpdateBulkDtos: AvailabilityScheduleEntryUpdateBulkDto[]
    ) {
        return await this.availabilityScheduleEntryService.updateManyByCycleIdAndProfessorId(
            cycleId,
            professorId,
            availabilityScheduleEntryUpdateBulkDtos
        );
    }

    @Patch('update/many/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async updateManyByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body()
        availabilityScheduleEntryUpdateBulkDtos: AvailabilityScheduleEntryUpdateBulkDto[]
    ) {
        return await this.availabilityScheduleEntryService.updateManyByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            availabilityScheduleEntryUpdateBulkDtos
        );
    }
}
