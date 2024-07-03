import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query
} from '@nestjs/common';

import { SemesterCareerInsertDto } from '../dto/SemesterCareerInsert.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { SemesterCareerService } from '../services/SemesterCareer.service';

@Controller({ path: 'semesterCareers', version: '1' })
export class SemesterCareerController {
    constructor(
        private readonly semesterCareerService: SemesterCareerService
    ) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.semesterCareerService.getAll(pageOptionsDto);
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async getById(
        @Param('id')
        id: number
    ) {
        return await this.semesterCareerService.getById(id);
    }

    @Post('insert')
    @HttpCode(HttpStatus.CREATED)
    async insert(@Body() semesterCareerInsertDto: SemesterCareerInsertDto) {
        return await this.semesterCareerService.insert(semesterCareerInsertDto);
    }

    @Post('insert/many')
    @HttpCode(HttpStatus.CREATED)
    async insertMany(
        @Body() semesterCareerInsertDtos: SemesterCareerInsertDto[]
    ) {
        return await this.semesterCareerService.insertMany(
            semesterCareerInsertDtos
        );
    }

    @Delete('delete/id/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id')
        id: number
    ) {
        return await this.semesterCareerService.delete(id);
    }
}
