/*
 * MIT License
 *
 * Copyright (c) 2023 Kawtious, Zeferito
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put
} from '@nestjs/common';
import { ProfessorService } from '../services/Professor.service';
import { ProfessorDto } from '../dto/Professor.dto';
import { Roles } from '../decorators/Roles.decorator';
import { Role } from '../enums/Roles.enum';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Professors')
@ApiBearerAuth('JWT-auth')
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
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'List of professors' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided.'
    })
    async getAll() {
        return await this.professorService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get professor by ID',
        description: 'Retrieve a professor by its ID.'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Professor details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided.'
    })
    async getById(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
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
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Professor created'
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided.'
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
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Professor updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided.'
    })
    async update(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
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
    @ApiBearerAuth('JWT-auth')
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
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided.'
    })
    async delete(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        await this.professorService.delete(Number(id));

        return;
    }
}
