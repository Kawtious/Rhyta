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
import { ProfessorEventDto } from '../dto/ProfessorEvent.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ProfessorEventService } from '../services/ProfessorEvent.service';

@ApiTags('Professor Events')
@Controller({ path: 'events', version: '1' })
export class ProfessorEventController {
    constructor(
        private readonly professorEventService: ProfessorEventService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get all events',
        description: 'Retrieve a list of all events'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of events' })
    async getAll() {
        return await this.professorEventService.getAll();
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Count all events',
        description: 'Retrieve the count of all events.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Events count' })
    async count() {
        return await this.professorEventService.count();
    }

    @Get(':professorId')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get all events by professor ID',
        description: 'Retrieve a list of all events for a specific professor.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of events' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor or events not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async getAllByProfessorId(
        @Param('professorId')
        professorId: string
    ) {
        if (isNaN(Number(professorId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.getAllByProfessorId(
            Number(professorId)
        );
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Count all events from a professor',
        description: 'Retrieve the count of all events from a professor.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Events count' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async countByProfessorId(
        @Param('professorId')
        professorId: string
    ) {
        if (isNaN(Number(professorId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.countByProfessorId(
            Number(professorId)
        );
    }

    @Get(':professorId/:eventId')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Get event by professor and event ID',
        description: 'Retrieve an event by professor and event ID.'
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'Event details' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor, event, or both not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async getByProfessorId(
        @Param('professorId')
        professorId: string,
        @Param('eventId')
        eventId: string
    ) {
        if (isNaN(Number(professorId)) || isNaN(Number(eventId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.getByProfessorId(
            Number(professorId),
            Number(eventId)
        );
    }

    @Post(':professorId')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Create a new event for a professor',
        description:
            'Create a new event for a specific professor with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: ProfessorEventDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Event created' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor not found'
    })
    async insertByProfessorId(
        @Param('professorId')
        professorId: string,
        @Body() professorEventDto: ProfessorEventDto
    ) {
        if (isNaN(Number(professorId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.insertByProfessorId(
            Number(professorId),
            professorEventDto
        );
    }

    @Put(':professorId/:eventId')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Update an event for a professor',
        description:
            'Update an existing event for a specific professor with the provided data.'
    })
    @ApiConsumes('application/json')
    @ApiBody({ type: ProfessorEventDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Event updated' })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor, event, or both not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async updateByProfessorId(
        @Param('professorId')
        professorId: string,
        @Param('eventId')
        eventId: string,
        @Body() professorEventDto: ProfessorEventDto
    ) {
        if (isNaN(Number(professorId)) || isNaN(Number(eventId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.updateByProfessorId(
            Number(professorId),
            Number(eventId),
            professorEventDto
        );
    }

    @Delete(':professorId/:eventId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
    @ApiOperation({
        summary: 'Delete an event for a professor',
        description:
            'Delete an event for a specific professor by professor and event ID.'
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Event deleted'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Professor, event, or both not found'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid ID'
    })
    async deleteByProfessorId(
        @Param('professorId')
        professorId: string,
        @Param('eventId')
        eventId: string
    ) {
        if (isNaN(Number(professorId)) || isNaN(Number(eventId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        await this.professorEventService.deleteByProfessorId(
            Number(professorId),
            Number(eventId)
        );

        return;
    }
}
