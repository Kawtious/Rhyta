import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put
} from '@nestjs/common';

import { Roles } from '../decorators/Roles.decorator';
import { GroupInsertDto } from '../dto/GroupInsert.dto';
import { GroupUpdateDto } from '../dto/GroupUpdate.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { GroupService } from '../services/Group.service';

@Controller({ path: 'groups', version: '1' })
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.groupService.getAll();
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

        return await this.groupService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insert(@Body() groupInsertDto: GroupInsertDto) {
        return await this.groupService.insert(groupInsertDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param('id')
        id: string,
        @Body() groupUpdateDto: GroupUpdateDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.groupService.update(Number(id), groupUpdateDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    async delete(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        await this.groupService.delete(Number(id));

        return;
    }
}
