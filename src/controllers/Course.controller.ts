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
import { CourseDto } from '../dto/Course.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { CourseService } from '../services/Course.service';

@ApiTags('Courses')
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
    @ApiResponse({ status: HttpStatus.OK, description: 'List of courses' })
    async getAll() {
        return await this.courseService.getAll();
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Count all courses',
        description: 'Retrieve the count of all courses.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Courses count' })
    async count() {
        return await this.courseService.count();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get course by ID',
        description: 'Retrieve a course by its ID.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Course details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found'
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
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Course created' })
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
    @ApiResponse({ status: HttpStatus.OK, description: 'Course updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Course not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
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
