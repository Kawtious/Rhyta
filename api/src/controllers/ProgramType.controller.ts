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

import { ProgramTypeInsertDto } from '../dto/ProgramTypeInsert.dto';
import { ProgramTypeUpdateDto } from '../dto/ProgramTypeUpdate.dto';
import { ProgramTypeUpdateBulkDto } from '../dto/ProgramTypeUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { ProgramTypeService } from '../services/ProgramType.service';

@Controller({ path: 'programTypes', version: '1' })
export class ProgramTypeController {
    constructor(private readonly programTypeService: ProgramTypeService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.programTypeService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.programTypeService.getById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() programTypeInsertDto: ProgramTypeInsertDto) {
        return await this.programTypeService.insert(programTypeInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() programTypeInsertDtos: ProgramTypeInsertDto[]) {
        return await this.programTypeService.insertMany(programTypeInsertDtos);
    }

    @Put('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() programTypeUpdateDto: ProgramTypeUpdateDto
    ) {
        return await this.programTypeService.update(id, programTypeUpdateDto);
    }

    @Put('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(
        @Body() programTypeUpdateBulkDtos: ProgramTypeUpdateBulkDto[]
    ) {
        return await this.programTypeService.updateMany(
            programTypeUpdateBulkDtos
        );
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.programTypeService.delete(Number(id));
    }
}
