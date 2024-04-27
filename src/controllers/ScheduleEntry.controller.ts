import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put
} from '@nestjs/common';

import { Roles } from '../decorators/Roles.decorator';
import { ScheduleEntryInsertDto } from '../dto/ScheduleEntryInsert.dto';
import { ScheduleEntryUpdateDto } from '../dto/ScheduleEntryUpdate.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ScheduleEntryService } from '../services/ScheduleEntry.service';

@Controller({ path: 'scheduleEntries', version: '1' })
export class ScheduleEntryController {
    constructor(private readonly scheduleEntryService: ScheduleEntryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.scheduleEntryService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getById(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.scheduleEntryService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insert(@Body() scheduleEntryInsertDto: ScheduleEntryInsertDto) {
        return await this.scheduleEntryService.insert(scheduleEntryInsertDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param('id')
        id: string,
        @Body() scheduleEntryUpdateDto: ScheduleEntryUpdateDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.scheduleEntryService.update(scheduleEntryUpdateDto);
    }
}
