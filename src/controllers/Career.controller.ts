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

import { Roles } from '../decorators/Roles.decorator';
import { CareerInsertDto } from '../dto/CareerInsert.dto';
import { CareerUpdateDto } from '../dto/CareerUpdate.dto';
import { CareerUpdateBulkDto } from '../dto/CareerUpdateBulk.dto';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { CareerService } from '../services/Career.service';

@Controller({ path: 'careers', version: '1' })
export class CareerController {
    constructor(private readonly careerService: CareerService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async getAll() {
        return await this.careerService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
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
    async insert(@Body() careerInsertDto: CareerInsertDto) {
        return await this.careerService.insert(careerInsertDto);
    }

    @Post('bulk')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    async insertBulk(@Body() careerInsertDtos: CareerInsertDto[]) {
        return await this.careerService.insertBulk(careerInsertDtos);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async update(
        @Param('id')
        id: string,
        @Body() careerUpdateDto: CareerUpdateDto
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.careerService.update(Number(id), careerUpdateDto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    async updateBulk(@Body() careerUpdateBulkDtos: CareerUpdateBulkDto[]) {
        return await this.careerService.updateBulk(careerUpdateBulkDtos);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(Role.Admin)
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
