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

import { AvailabilityScheduleInsertDto } from '../dto/AvailabilityScheduleInsert.dto';
import { AvailabilityScheduleOptionsDto } from '../dto/AvailabilityScheduleOptions.dto';
import { AvailabilityScheduleUpdateDto } from '../dto/AvailabilityScheduleUpdate.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { AvailabilityScheduleService } from '../services/AvailabilitySchedule.service';

@Controller({ path: 'availability-schedules', version: '1' })
export class AvailabilityScheduleController {
    constructor(
        private readonly availabilityScheduleService: AvailabilityScheduleService
    ) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.availabilityScheduleService.getAll(
            availabilityScheduleOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/professor/:professorId')
    @HttpCode(HttpStatus.OK)
    async getAllByProfessorId(
        @Param('professorId')
        professorId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.availabilityScheduleService.getAllByProfessorId(
            professorId,
            availabilityScheduleOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/classroom/:classroomId')
    @HttpCode(HttpStatus.OK)
    async getAllByClassroomId(
        @Param('classroomId')
        classroomId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.availabilityScheduleService.getAllByClassroomId(
            classroomId,
            availabilityScheduleOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async getByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId') professorId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto
    ) {
        return await this.availabilityScheduleService.getByCycleIdAndProfessorId(
            cycleId,
            professorId,
            availabilityScheduleOptionsDto
        );
    }

    @Get('search/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async getByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId') classroomId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto
    ) {
        return await this.availabilityScheduleService.getByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            availabilityScheduleOptionsDto
        );
    }

    @Post('insert/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.CREATED)
    async insertByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body() availabilityScheduleInsertDto: AvailabilityScheduleInsertDto
    ) {
        return await this.availabilityScheduleService.insertByCycleIdAndProfessorId(
            cycleId,
            professorId,
            availabilityScheduleInsertDto
        );
    }

    @Post('insert/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.CREATED)
    async insertByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body() availabilityScheduleInsertDto: AvailabilityScheduleInsertDto
    ) {
        return await this.availabilityScheduleService.insertByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            availabilityScheduleInsertDto
        );
    }

    @Put('update/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async updateByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId')
        professorId: number,
        @Body() availabilityScheduleUpdateDto: AvailabilityScheduleUpdateDto
    ) {
        return await this.availabilityScheduleService.updateByCycleIdAndProfessorId(
            cycleId,
            professorId,
            availabilityScheduleUpdateDto
        );
    }

    @Put('update/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId')
        classroomId: number,
        @Body() availabilityScheduleUpdateDto: AvailabilityScheduleUpdateDto
    ) {
        return await this.availabilityScheduleService.updateByCycleIdAndClassroomId(
            cycleId,
            classroomId,
            availabilityScheduleUpdateDto
        );
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.availabilityScheduleService.delete(Number(id));
    }
}
