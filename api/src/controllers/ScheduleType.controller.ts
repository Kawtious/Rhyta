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
    async search(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.scheduleTypeService.search(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async searchById(
        @Param('id')
        id: number
    ) {
        return await this.scheduleTypeService.searchById(id);
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
    async updateById(
        @Param('id')
        id: number,
        @Body() scheduleTypeUpdateDto: ScheduleTypeUpdateDto
    ) {
        return await this.scheduleTypeService.updateById(
            id,
            scheduleTypeUpdateDto
        );
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
    async deleteById(
        @Param('id')
        id: number
    ) {
        return await this.scheduleTypeService.deleteById(Number(id));
    }
}
