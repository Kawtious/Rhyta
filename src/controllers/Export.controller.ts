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
    @Header('Content-Disposition', 'attachment;filename=careers.csv')
    @Roles(Role.Admin)
    async exportCSVCareers() {
        return await this.exportService.exportCSVCareers();
    }

    @Get('csv/courses')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=courses.csv')
    @Roles(Role.Admin)
    async exportCSVCourses() {
        return await this.exportService.exportCSVCourses();
    }

    @Get('csv/groups')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=groups.csv')
    @Roles(Role.Admin)
    async exportCSVGroups() {
        return await this.exportService.exportCSVGroups();
    }

    @Get('csv/professors')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=professors.csv')
    @Roles(Role.Admin)
    async exportCSVProfessors() {
        return await this.exportService.exportCSVProfessors();
    }

    @Get('csv/programs')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=programs.csv')
    @Roles(Role.Admin)
    async exportCSVPrograms() {
        return await this.exportService.exportCSVPrograms();
    }

    @Get('csv/programtypes')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=programTypes.csv')
    @Roles(Role.Admin)
    async exportCSVProgramTypes() {
        return await this.exportService.exportCSVProgramTypes();
    }

    @Get('hex/professors')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Roles(Role.Admin)
    async exportHexProfessors(
        @Param('cycleId')
        cycleId: string
    ) {
        if (isNaN(Number(cycleId))) {
            throw new MethodArgumentNotValidError('Invalid ID');
        }

        return await this.exportService.exportHexProfessors(Number(cycleId));
    }
}
