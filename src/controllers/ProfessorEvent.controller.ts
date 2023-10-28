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
import { ProfessorEventService } from '../services/ProfessorEvent.service';
import { ProfessorEventDto } from '../payloads/dto/ProfessorEventDto';
import { Roles } from '../decorators/Roles.decorator';
import { Role } from '../enums/Roles.enum';

@Controller('events')
export class ProfessorEventController {
    constructor(
        private readonly professorEventService: ProfessorEventService
    ) {}

    @Get(':professorId')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAllByProfessorId(
        @Param(
            'professorId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        professorId: string
    ) {
        if (isNaN(Number(professorId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.professorEventService.getAllByProfessorId(
            Number(professorId)
        );
    }

    @Get(':professorId/:eventId')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getByProfessorId(
        @Param(
            'professorId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        professorId: string,
        @Param(
            'eventId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
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
    async insertByProfessorId(
        @Param(
            'professorId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
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
    async updateByProfessorId(
        @Param(
            'professorId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        professorId: string,
        @Param(
            'eventId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
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
    async deleteByProfessorId(
        @Param(
            'professorId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        professorId: string,
        @Param(
            'eventId',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
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
