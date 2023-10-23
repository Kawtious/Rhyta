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
import { ProfessorEventService } from '../services/ProfessorEvent.service';
import { ProfessorEventDto } from '../payloads/dto/ProfessorEventDto';

@Controller()
export class ProfessorEventController {
    constructor(
        private readonly professorEventService: ProfessorEventService
    ) {}

    @Get(':professorId')
    @HttpCode(HttpStatus.OK)
    async getAllByProfessorId(@Param('professorId') professorId: string) {
        const _professorId = Number(professorId);

        if (isNaN(_professorId)) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.getAllByProfessorId(
            _professorId
        );
    }

    @Get(':professorId/:eventId')
    @HttpCode(HttpStatus.OK)
    async getByProfessorId(
        @Param('professorId') professorId: string,
        @Param('eventId') eventId: string
    ) {
        const _professorId = Number(professorId);
        const _eventId = Number(eventId);

        if (isNaN(_professorId) || isNaN(_eventId)) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        const event = await this.professorEventService.getByProfessorId(
            _professorId,
            _eventId
        );

        return event;
    }

    @Post(':professorId')
    @HttpCode(HttpStatus.CREATED)
    async insertByProfessorId(
        @Param('professorId') professorId: string,
        @Body() body: ProfessorEventDto
    ) {
        const _professorId = Number(professorId);

        if (isNaN(_professorId)) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.insertByProfessorId(
            _professorId,
            body.title,
            body.description,
            body.startDate,
            body.endDate
        );
    }

    @Put(':professorId/:eventId')
    @HttpCode(HttpStatus.OK)
    async updateByProfessorId(
        @Param('professorId') professorId: string,
        @Param('eventId') eventId: string,
        @Body() body: ProfessorEventDto
    ) {
        const _professorId = Number(professorId);
        const _eventId = Number(eventId);

        if (isNaN(_professorId) || isNaN(_eventId)) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.updateByProfessorId(
            _professorId,
            _eventId,
            body.title,
            body.description,
            body.startDate,
            body.endDate
        );
    }

    @Delete(':professorId/:eventId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteByProfessorId(
        @Param('professorId') professorId: string,
        @Param('eventId') eventId: string
    ) {
        const _professorId = Number(professorId);
        const _eventId = Number(eventId);

        if (isNaN(_professorId) || isNaN(_eventId)) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        await this.professorEventService.deleteByProfessorId(
            _professorId,
            _eventId
        );

        return;
    }
}
