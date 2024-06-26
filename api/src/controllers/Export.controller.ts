import {
    Controller,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param
} from '@nestjs/common';

import { ExportService } from '../services/Export.service';

@Controller({ path: 'export', version: '1' })
export class ExportController {
    constructor(private readonly exportService: ExportService) {}

    @Get('csv/courses')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=courses.csv')
    async exportCSVCourses() {
        return await this.exportService.exportCSVCourses();
    }

    @Get('csv/groups')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=groups.csv')
    async exportCSVGroups() {
        return await this.exportService.exportCSVGroups();
    }

    @Get('csv/paths')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=careers.csv')
    async exportCSVPaths() {
        return await this.exportService.exportCSVPaths();
    }

    @Get('csv/professors')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=professors.csv')
    async exportCSVProfessors() {
        return await this.exportService.exportCSVProfessors();
    }

    @Get('csv/programs')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=programs.csv')
    async exportCSVPrograms() {
        return await this.exportService.exportCSVPrograms();
    }

    @Get('csv/programs/types')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=programTypes.csv')
    async exportCSVProgramTypes() {
        return await this.exportService.exportCSVProgramTypes();
    }

    @Get('hex/professors/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', `attachment;filename=professors.dat`)
    async exportHexProfessors(
        @Param('cycleId')
        cycleId: number
    ) {
        return await this.exportService.exportHexProfessors(cycleId);
    }

    @Get('hex/classrooms/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', 'attachment;filename=classrooms.dat')
    async exportHexClassrooms(
        @Param('cycleId')
        cycleId: number
    ) {
        return await this.exportService.exportHexClassrooms(cycleId);
    }
}
