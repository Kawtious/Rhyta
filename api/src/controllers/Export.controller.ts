import {
    Controller,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param
} from '@nestjs/common';

import { Permissions } from '../decorators/Permissions.decorator';
import { Permission } from '../enums/Permission.enum';
import { ExportService } from '../services/Export.service';

@Controller({ path: 'export', version: '1' })
export class ExportController {
    constructor(private readonly exportService: ExportService) {}

    @Get('csv/courses')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=courses.csv')
    @Permissions(Permission.Admin)
    async exportCSVCourses() {
        return await this.exportService.exportCSVCourses();
    }

    @Get('csv/groups')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=groups.csv')
    @Permissions(Permission.Admin)
    async exportCSVGroups() {
        return await this.exportService.exportCSVGroups();
    }

    @Get('csv/paths')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=careers.csv')
    @Permissions(Permission.Admin)
    async exportCSVPaths() {
        return await this.exportService.exportCSVPaths();
    }

    @Get('csv/professors')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=professors.csv')
    @Permissions(Permission.Admin)
    async exportCSVProfessors() {
        return await this.exportService.exportCSVProfessors();
    }

    @Get('csv/programs')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=programs.csv')
    @Permissions(Permission.Admin)
    async exportCSVPrograms() {
        return await this.exportService.exportCSVPrograms();
    }

    @Get('csv/programs/types')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=programTypes.csv')
    @Permissions(Permission.Admin)
    async exportCSVProgramTypes() {
        return await this.exportService.exportCSVProgramTypes();
    }

    @Get('hex/professors/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', `attachment;filename=professors`)
    @Permissions(Permission.Admin)
    async exportHexProfessors(
        @Param('cycleId')
        cycleId: number
    ) {
        return await this.exportService.exportHexProfessors(cycleId);
    }

    @Get('hex/classrooms/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', 'attachment;filename=classrooms')
    @Permissions(Permission.Admin)
    async exportHexClassrooms(
        @Param('cycleId')
        cycleId: number
    ) {
        return await this.exportService.exportHexClassrooms(cycleId);
    }
}
