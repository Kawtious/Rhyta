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
    Post,
    Put
} from '@nestjs/common';
import { TermService } from '../services/Term.service';
import { TermDto } from '../dto/Term.dto';
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

@ApiTags('Terms')
@ApiBearerAuth('JWT-auth')
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
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'List of terms' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided'
    })
    async getAll() {
        return await this.termService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get term by ID',
        description: 'Retrieve a term by its ID.'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Term details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Term not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided'
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
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Term created' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided'
    })
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
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Term updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Term not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided'
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
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Term deleted' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Term not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided'
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
