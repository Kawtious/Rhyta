import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put
} from '@nestjs/common';

import { Roles } from '../decorators/Roles.decorator';
import { ProgramTypeInsertDto } from '../dto/ProgramTypeInsert.dto';
import { ProgramTypeUpdateDto } from '../dto/ProgramTypeUpdate.dto';
import { ProgramTypeUpdateBulkDto } from '../dto/ProgramTypeUpdateBulk.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ProgramTypeService } from '../services/ProgramType.service';

@Controller({ path: 'programTypes', version: '1' })
export class ProgramTypeController {
    constructor(private readonly programTypeService: ProgramTypeService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.programTypeService.getAll();
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

        return await this.programTypeService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insert(@Body() programTypeInsertDto: ProgramTypeInsertDto) {
        return await this.programTypeService.insert(programTypeInsertDto);
    }

    @Post('bulk')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insertBulk(@Body() programTypeInsertDtos: ProgramTypeInsertDto[]) {
        return await this.programTypeService.insertBulk(programTypeInsertDtos);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param('id')
        id: string,
        @Body() programTypeUpdateDto: ProgramTypeUpdateDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.programTypeService.update(
            Number(id),
            programTypeUpdateDto
        );
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async updateBulk(
        @Body() programTypeUpdateBulkDtos: ProgramTypeUpdateBulkDto[]
    ) {
        return await this.programTypeService.updateBulk(
            programTypeUpdateBulkDtos
        );
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

        await this.programTypeService.delete(Number(id));

        return;
    }
}
