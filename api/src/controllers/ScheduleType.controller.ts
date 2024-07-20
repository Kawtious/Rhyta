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

import { ScheduleTypeInsertDto } from '../dto/ScheduleTypeInsert.dto';
import { ScheduleTypeUpdateDto } from '../dto/ScheduleTypeUpdate.dto';
import { ScheduleTypeUpdateBulkDto } from '../dto/ScheduleTypeUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ScheduleTypeService } from '../services/ScheduleType.service';

@Controller({ path: 'schedule-types', version: '1' })
export class ScheduleTypeController {
    constructor(private readonly scheduleTypeService: ScheduleTypeService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.scheduleTypeService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.scheduleTypeService.getById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() scheduleTypeInsertDto: ScheduleTypeInsertDto) {
        return await this.scheduleTypeService.insert(scheduleTypeInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() scheduleTypeInsertDtos: ScheduleTypeInsertDto[]) {
        return await this.scheduleTypeService.insertMany(
            scheduleTypeInsertDtos
        );
    }

    @Patch('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() scheduleTypeUpdateDto: ScheduleTypeUpdateDto
    ) {
        return await this.scheduleTypeService.update(id, scheduleTypeUpdateDto);
    }

    @Patch('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(
        @Body() scheduleTypeUpdateBulkDtos: ScheduleTypeUpdateBulkDto[]
    ) {
        return await this.scheduleTypeService.updateMany(
            scheduleTypeUpdateBulkDtos
        );
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.scheduleTypeService.delete(Number(id));
    }
}
