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
import { TermDto } from '../dto/Term.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { TermService } from '../services/Term.service';

@ApiTags('Terms')
@Controller({ path: 'terms', version: '1' })
export class TermController {
    constructor(private readonly termService: TermService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get all terms',
        description: 'Retrieve a list of all terms.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of terms' })
    async getAll() {
        return await this.termService.getAll();
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Count all terms',
        description: 'Retrieve the count of all terms.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Terms count' })
    async count() {
        return await this.termService.count();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get term by ID',
        description: 'Retrieve a term by its ID.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Term details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Term not found'
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

        return await this.termService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Create a new term',
        description: 'Create a new term with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: TermDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Term created' })
    async insert(@Body() termDto: TermDto) {
        return await this.termService.insert(termDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Update a term',
        description: 'Update an existing term with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: TermDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Term updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Term not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async update(
        @Param('id')
        id: string,
        @Body() termDto: TermDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.termService.update(Number(id), termDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Delete a term',
        description: 'Delete a term by its ID.'
    })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Term deleted' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Term not found'
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

        await this.termService.delete(Number(id));

        return;
    }
}
