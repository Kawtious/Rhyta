import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query
} from '@nestjs/common';

import { PathInsertDto } from '../dto/PathInsert.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { PathService } from '../services/Path.service';

@Controller({ path: 'paths', version: '1' })
export class PathController {
    constructor(private readonly pathService: PathService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.pathService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.pathService.getById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() pathInsertDto: PathInsertDto) {
        return await this.pathService.insert(pathInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() pathInsertDtos: PathInsertDto[]) {
        return await this.pathService.insertMany(pathInsertDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.pathService.delete(id);
    }
}
