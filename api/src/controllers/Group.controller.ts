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
import { GroupInsertDto } from '../dto/GroupInsert.dto';
import { GroupUpdateDto } from '../dto/GroupUpdate.dto';
import { GroupUpdateBulkDto } from '../dto/GroupUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Permission } from '../enums/Permission.enum';
import { GroupService } from '../services/Group.service';

@Controller({ path: 'groups', version: '1' })
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.groupService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.groupService.getById(id);
    }

    // @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insert(@Body() groupInsertDto: GroupInsertDto) {
        return await this.groupService.insert(groupInsertDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insertMany(@Body() groupInsertDtos: GroupInsertDto[]) {
        return await this.groupService.insertMany(groupInsertDtos);
    }

    @Put('update/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async update(
        @Param('id')
        id: number,
        @Body() groupUpdateDto: GroupUpdateDto
    ) {
        return await this.groupService.update(id, groupUpdateDto);
    }

    @Put('update/many')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async updateMany(@Body() groupUpdateBulkDtos: GroupUpdateBulkDto[]) {
        return await this.groupService.updateMany(groupUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(Permission.Admin)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.groupService.delete(id);
    }
}
