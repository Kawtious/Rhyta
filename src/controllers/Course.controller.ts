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
import { CourseService } from '../services/Course.service';
import { CourseDto } from '../payloads/dto/CourseDto';
import { Roles } from '../decorators/Roles.decorator';
import { Role } from '../enums/Roles.enum';

@Controller({ path: 'courses', version: '1' })
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.courseService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
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

        return await this.courseService.getById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insert(@Body() courseDto: CourseDto) {
        return await this.courseService.insert(courseDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
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

        await this.courseService.delete(Number(id));

        return;
    }
}
