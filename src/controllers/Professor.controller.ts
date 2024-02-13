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
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

import { Roles } from '../decorators/Roles.decorator';
import { ProfessorDto } from '../dto/Professor.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ProfessorService } from '../services/Professor.service';

@ApiTags('Professors')
@Controller({ path: 'professors', version: '1' })
export class ProfessorController {
    constructor(private readonly professorService: ProfessorService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get all professors',
        description: 'Retrieve a list of all professors.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of professors' })
    async getAll() {
        return await this.professorService.getAll();
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Count all professors',
        description: 'Retrieve the count of all professors.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Professors count' })
    async count() {
        return await this.professorService.count();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get professor by ID',
        description: 'Retrieve a professor by its ID.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Professor details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async getById(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Create a new professor',
        description: 'Create a new professor with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: ProfessorDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Professor created'
    })
    async insert(@Body() professorDto: ProfessorDto) {
        return await this.professorService.insert(professorDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Update a professor',
        description: 'Update an existing professor with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: ProfessorDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Professor updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async update(
        @Param('id')
        id: string,
        @Body() professorDto: ProfessorDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorService.update(Number(id), professorDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Delete a professor',
        description: 'Delete a professor by its ID.'
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Professor deleted'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async delete(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        await this.professorService.delete(Number(id));

        return;
    }
}
