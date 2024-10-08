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

import { GroupInsertDto } from '../dto/GroupInsert.dto';
import { GroupUpdateDto } from '../dto/GroupUpdate.dto';
import { GroupUpdateBulkDto } from '../dto/GroupUpdateBulk.dto';
import { GroupOptionsDto } from '../dto/options/GroupOptions.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { GroupService } from '../services/Group.service';

@Controller({ path: 'groups', version: '1' })
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(
        @Query() groupOptionsDto: GroupOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.groupService.getAll(groupOptionsDto, pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number,
        @Query() groupOptionsDto: GroupOptionsDto
    ) {
        return await this.groupService.getById(id, groupOptionsDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() groupInsertDto: GroupInsertDto) {
        return await this.groupService.insert(groupInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(@Body() groupInsertDtos: GroupInsertDto[]) {
        return await this.groupService.insertMany(groupInsertDtos);
    }

    @Patch('update/id/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id')
        id: number,
        @Body() groupUpdateDto: GroupUpdateDto
    ) {
        return await this.groupService.update(id, groupUpdateDto);
    }

    @Patch('update/many')
    @HttpCode(HttpStatus.OK)
    async updateMany(@Body() groupUpdateBulkDtos: GroupUpdateBulkDto[]) {
        return await this.groupService.updateMany(groupUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.groupService.delete(id);
    }
}
