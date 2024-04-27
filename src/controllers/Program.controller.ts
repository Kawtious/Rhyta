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
import { ProgramInsertDto } from '../dto/ProgramInsert.dto';
import { ProgramUpdateDto } from '../dto/ProgramUpdate.dto';
import { ProgramUpdateBulkDto } from '../dto/ProgramUpdateBulk.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ProgramService } from '../services/Program.service';

@Controller({ path: 'programs', version: '1' })
export class ProgramController {
    constructor(private readonly programService: ProgramService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.programService.getAll();
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

        return await this.programService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insert(@Body() programInsertDto: ProgramInsertDto) {
        return await this.programService.insert(programInsertDto);
    }

    @Post('bulk')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insertBulk(@Body() programInsertDtos: ProgramInsertDto[]) {
        return await this.programService.insertBulk(programInsertDtos);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param('id')
        id: string,
        @Body() programUpdateDto: ProgramUpdateDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.programService.update(Number(id), programUpdateDto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async updateBulk(@Body() programUpdateBulkDtos: ProgramUpdateBulkDto[]) {
        return await this.programService.updateBulk(programUpdateBulkDtos);
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

        await this.programService.delete(Number(id));

        return;
    }
}
