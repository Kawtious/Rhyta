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

import { CycleInsertDto } from '../dto/CycleInsert.dto';
import { CycleUpdateDto } from '../dto/CycleUpdate.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { CycleService } from '../services/Cycle.service';

@Controller({ path: 'cycles', version: '1' })
export class CycleController {
    constructor(private readonly cycleService: CycleService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.cycleService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.cycleService.getById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() cycleInsertDto: CycleInsertDto) {
        return await this.cycleService.insert(cycleInsertDto);
    }

    @Patch('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() cycleUpdateDto: CycleUpdateDto
    ) {
        return await this.cycleService.update(id, cycleUpdateDto);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.cycleService.delete(id);
    }
}
