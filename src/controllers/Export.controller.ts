import {
    Controller,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Query
} from '@nestjs/common';

import { Roles } from '../decorators/Roles.decorator';
import { Role } from '../enums/Role.enum';
import { MethodArgumentNotValidError } from '../errors/MethodArgumentNotValidError';
import { ExportService } from '../services/Export.service';

@Controller({ path: 'export', version: '1' })
export class ExportController {
    constructor(private readonly exportService: ExportService) {}

    @Get('csv/careers')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVCareers() {
        return await this.exportService.exportCSVCareers();
    }

    @Get('csv/careers/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVCareer(
        @Param('id')
        id: string,
        @Query('course') course?: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        if (course) {
            if (isNaN(Number(course))) {
                throw new MethodArgumentNotValidError('Invalid Course ID');
            }
        }

        return await this.exportService.exportCSVCareer(
            Number(id),
            Number(course)
        );
    }

    @Get('csv/courses')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVCourses() {
        return await this.exportService.exportCSVCourses();
    }

    @Get('csv/courses/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVCourse(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.exportService.exportCSVCourse(Number(id));
    }

    @Get('csv/groups')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVGroups() {
        return await this.exportService.exportCSVGroups();
    }

    @Get('csv/groups/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVGroup(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.exportService.exportCSVGroup(Number(id));
    }

    @Get('csv/professors')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVProfessors() {
        return await this.exportService.exportCSVProfessors();
    }

    @Get('csv/professors/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVProfessor(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.exportService.exportCSVProfessor(Number(id));
    }

    @Get('csv/programs')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVPrograms() {
        return await this.exportService.exportCSVPrograms();
    }

    @Get('csv/programs/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVProgram(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.exportService.exportCSVProgram(Number(id));
    }

    @Get('csv/programtypes')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVProgramTypes() {
        return await this.exportService.exportCSVProgramTypes();
    }

    @Get('csv/programtypes/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Roles(Role.Admin)
    async exportCSVProgramType(
        @Param('id')
        id: string
    ) {
        if (isNaN(Number(id))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.exportService.exportCSVProgramType(Number(id));
    }
}
