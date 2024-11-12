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
import { SemesterCareerOptionsDto } from '../dto/options/SemesterCareerOptions.dto';
import { PageOptionsDto } from '../dto/pagination/PageOptions.dto';
import { SemesterCareerService } from '../services/SemesterCareer.service';

@Controller({ path: 'semester-careers', version: '1' })
export class SemesterCareerController {
    constructor(
        private readonly semesterCareerService: SemesterCareerService
    ) {}

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async search(
        @Query() semesterCareerOptionsDto: SemesterCareerOptionsDto,
        @Query() pageOptionsDto: PageOptionsDto
    ) {
        return await this.semesterCareerService.search(
            semesterCareerOptionsDto,
            pageOptionsDto
        );
    }

    @Get('search/id/:id')
    @HttpCode(HttpStatus.OK)
    async searchById(
        @Param('id')
        id: number,
        @Query() semesterCareerOptionsDto: SemesterCareerOptionsDto
    ) {
        return await this.semesterCareerService.searchById(
            id,
            semesterCareerOptionsDto
        );
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
    async deleteById(
        @Param('id')
        id: number
    ) {
        return await this.semesterCareerService.deleteById(id);
    }
}
