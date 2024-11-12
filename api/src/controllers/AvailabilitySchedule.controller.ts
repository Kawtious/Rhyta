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

import { AvailabilityScheduleInsertDto } from '../dto/AvailabilityScheduleInsert.dto';
import { AvailabilityScheduleUpdateDto } from '../dto/AvailabilityScheduleUpdate.dto';
import { AvailabilityScheduleOptionsDto } from '../dto/options/AvailabilityScheduleOptions.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { AvailabilityScheduleService } from '../services/AvailabilitySchedule.service';

@Controller({ path: 'availability-schedules', version: '1' })
export class AvailabilityScheduleController {
    constructor(
        private readonly availabilityScheduleService: AvailabilityScheduleService
    ) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async search(
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.availabilityScheduleService.search(
            availabilityScheduleOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/professor/:professorId')
    @HttpCode(HttpStatus.OK)
    async searchByProfessorId(
        @Param('professorId')
        professorId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.availabilityScheduleService.searchByProfessorId(
            professorId,
            availabilityScheduleOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/classroom/:classroomId')
    @HttpCode(HttpStatus.OK)
    async searchByClassroomId(
        @Param('classroomId')
        classroomId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.availabilityScheduleService.searchByClassroomId(
            classroomId,
            availabilityScheduleOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/cycle/professor/:cycleId/:professorId')
    @HttpCode(HttpStatus.OK)
    async searchByCycleIdAndProfessorId(
        @Param('cycleId')
        cycleId: number,
        @Param('professorId') professorId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto
    ) {
        return await this.availabilityScheduleService.searchByCycleIdAndProfessorId(
            cycleId,
            professorId,
            availabilityScheduleOptionsDto
        );
    }

    @Get('search/cycle/classroom/:cycleId/:classroomId')
    @HttpCode(HttpStatus.OK)
    async searchByCycleIdAndClassroomId(
        @Param('cycleId')
        cycleId: number,
        @Param('classroomId') classroomId: number,
        @Query() availabilityScheduleOptionsDto: AvailabilityScheduleOptionsDto
    ) {
        return await this.availabilityScheduleService.searchByCycleIdAndClassroomId(
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

    @Patch('update/cycle/professor/:cycleId/:professorId')
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

    @Patch('update/cycle/classroom/:cycleId/:classroomId')
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
    async deleteById(
        @Param('id')
        id: number
    ) {
        return await this.availabilityScheduleService.deleteById(Number(id));
    }
}
