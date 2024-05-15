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
import { ProgramInsertDto } from '../dto/ProgramInsert.dto';
import { ProgramUpdateDto } from '../dto/ProgramUpdate.dto';
import { ProgramUpdateBulkDto } from '../dto/ProgramUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Permission } from '../enums/Permission.enum';
import { ProgramService } from '../services/Program.service';

@Controller({ path: 'programs', version: '1' })
export class ProgramController {
    constructor(private readonly programService: ProgramService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.programService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.programService.getById(id);
    }

    // @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insert(@Body() programInsertDto: ProgramInsertDto) {
        return await this.programService.insert(programInsertDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insertMany(@Body() programInsertDtos: ProgramInsertDto[]) {
        return await this.programService.insertMany(programInsertDtos);
    }

    @Put('update/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async update(
        @Param('id')
        id: number,
        @Body() programUpdateDto: ProgramUpdateDto
    ) {
        return await this.programService.update(id, programUpdateDto);
    }

    @Put('update/many')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async updateMany(@Body() programUpdateBulkDtos: ProgramUpdateBulkDto[]) {
        return await this.programService.updateMany(programUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(Permission.Admin)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.programService.delete(id);
    }
}
