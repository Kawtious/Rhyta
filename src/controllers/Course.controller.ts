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
import { CourseService } from '../services/Course.service';
import { CourseDto } from '../dto/Course.dto';
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

@ApiTags('Courses')
@ApiBearerAuth('JWT-auth')
@Controller({ path: 'courses', version: '1' })
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get all courses',
        description: 'Retrieve a list of all courses.'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'List of courses' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided'
    })
    async getAll() {
        return await this.courseService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get course by ID',
        description: 'Retrieve a course by its ID.'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Course details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found'
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

        return await this.courseService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Create a new course',
        description: 'Create a new course with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: CourseDto })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Course created' })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Access denied. No valid token provided'
    })
    async insert(@Body() courseDto: CourseDto) {
        return await this.courseService.insert(courseDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Update a course',
        description: 'Update an existing course with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: CourseDto })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: HttpStatus.OK, description: 'Course updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found'
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
        @Body() courseDto: CourseDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.courseService.update(Number(id), courseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Delete a course',
        description: 'Delete a course by its ID.'
    })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Course deleted'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found'
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

        await this.courseService.delete(Number(id));

        return;
    }
}
