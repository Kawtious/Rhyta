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

import { ScheduleInsertDto } from '../dto/ScheduleInsert.dto';
import { ScheduleOptionsDto } from '../dto/ScheduleOptions.dto';
import { ScheduleUpdateDto } from '../dto/ScheduleUpdate.dto';
import { ScheduleUpdateBulkDto } from '../dto/ScheduleUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ScheduleService } from '../services/Schedule.service';

@Controller({ path: 'schedules', version: '1' })
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(
        @Query() scheduleOptionsDto: ScheduleOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.scheduleService.getAll(
            scheduleOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number,
        @Query() scheduleOptionsDto: ScheduleOptionsDto
    ) {
        return await this.scheduleService.getById(id, scheduleOptionsDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() scheduleInsertDto: ScheduleInsertDto) {
        return await this.scheduleService.insert(scheduleInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() scheduleInsertDtos: ScheduleInsertDto[]) {
        return await this.scheduleService.insertMany(scheduleInsertDtos);
    }

    @Patch('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() scheduleUpdateDto: ScheduleUpdateDto
    ) {
        return await this.scheduleService.update(id, scheduleUpdateDto);
    }

    @Patch('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(@Body() scheduleUpdateBulkDtos: ScheduleUpdateBulkDto[]) {
        return await this.scheduleService.updateMany(scheduleUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.scheduleService.delete(id);
    }
}
