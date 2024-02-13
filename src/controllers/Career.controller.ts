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
import { CareerDto } from '../dto/Career.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { CareerService } from '../services/Career.service';

@ApiTags('Careers')
@Controller({ path: 'careers', version: '1' })
export class CareerController {
    constructor(private readonly careerService: CareerService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get all careers',
        description: 'Retrieve a list of all careers.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of careers' })
    async getAll() {
        return await this.careerService.getAll();
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Count all careers',
        description: 'Retrieve the count of all careers.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Careers count' })
    async count() {
        return await this.careerService.count();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get career by ID',
        description: 'Retrieve a career by its ID.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Career details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Career not found'
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

        return await this.careerService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Create a new career',
        description: 'Create a new career with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: CareerDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Career created' })
    async insert(@Body() careerDto: CareerDto) {
        return await this.careerService.insert(careerDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Update a career',
        description: 'Update an existing career with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: CareerDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Career updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Career not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async update(
        @Param('id')
        id: string,
        @Body() careerDto: CareerDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.careerService.update(Number(id), careerDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Delete a career',
        description: 'Delete a career by its ID.'
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Career deleted'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Career not found'
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

        await this.careerService.delete(Number(id));

        return;
    }
}
