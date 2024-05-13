import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';

import { Permissions } from '../decorators/Permissions.decorator';
import { CareerInsertDto } from '../dto/CareerInsert.dto';
import { CareerUpdateDto } from '../dto/CareerUpdate.dto';
import { CareerUpdateBulkDto } from '../dto/CareerUpdateBulk.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { Permission } from '../entities/Role.entity';
import { CareerService } from '../services/Career.service';

@Controller({ path: 'careers', version: '1' })
export class CareerController {
    constructor(private readonly careerService: CareerService) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.careerService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.careerService.getById(id);
    }

    //@Post('insert')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insert(@Body() careerInsertDto: CareerInsertDto) {
        return await this.careerService.insert(careerInsertDto);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.Admin)
    async insertMany(@Body() careerInsertDtos: CareerInsertDto[]) {
        return await this.careerService.insertMany(careerInsertDtos);
    }

    @Put('update/id/:id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async update(
        @Param('id')
        id: number,
        @Body() careerUpdateDto: CareerUpdateDto
    ) {
        return await this.careerService.update(id, careerUpdateDto);
    }

    @Put('update/many')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.Admin)
    async updateMany(@Body() careerUpdateBulkDtos: CareerUpdateBulkDto[]) {
        return await this.careerService.updateMany(careerUpdateBulkDtos);
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(Permission.Admin)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.careerService.delete(id);
    }
}
