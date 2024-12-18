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

    @Get('fetch')
    @HttpCode(HttpStatus.OK)
    async fetch() {
        return await this.cycleService.fetch();
    }

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async search(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.cycleService.search(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async searchById(
        @Param('id')
        id: number
    ) {
        return await this.cycleService.searchById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() cycleInsertDto: CycleInsertDto) {
        return await this.cycleService.insert(cycleInsertDto);
    }

    @Patch('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async updateById(
        @Param('id')
        id: number,
        @Body() cycleUpdateDto: CycleUpdateDto
    ) {
        return await this.cycleService.updateById(id, cycleUpdateDto);
    }

    @Patch('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(@Body() cycleUpdateDtos: CycleUpdateDto[]) {
        return await this.cycleService.updateMany(cycleUpdateDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(
        @Param('id')
        id: number
    ) {
        return await this.cycleService.deleteById(id);
    }
}
