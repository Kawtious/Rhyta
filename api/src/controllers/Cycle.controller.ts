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

import { Permissions } from '../decorators/Permissions.decorator';
import { CycleInsertDto } from '../dto/CycleInsert.dto';
import { CycleUpdateDto } from '../dto/CycleUpdate.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Permission } from '../enums/Permission.enum';
import { CycleService } from '../services/Cycle.service';

@Controller({ path: 'cycles', version: '1' })
export class CycleController {
    constructor(private readonly cycleService: CycleService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.cycleService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.cycleService.getById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insert(@Body() cycleInsertDto: CycleInsertDto) {
        return await this.cycleService.insert(cycleInsertDto);
    }

    @Put('update/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async update(
        @Param('id')
        id: number,
        @Body() cycleUpdateDto: CycleUpdateDto
    ) {
        return await this.cycleService.update(id, cycleUpdateDto);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(Permission.Admin)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.cycleService.delete(id);
    }
}
