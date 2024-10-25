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

    @Get('courses')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=courses.csv')
    async exportCoursesAsCSV() {
        return await this.exportService.exportCoursesAsCSV();
    }

    @Get('groups')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=groups.csv')
    async exportGroupsAsCSV() {
        return await this.exportService.exportGroupsAsCSV();
    }

    @Get('semester-careers')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=semester_careers.csv')
    async exportSemesterCareersAsCSV() {
        return await this.exportService.exportSemesterCareersAsCSV();
    }

    @Get('professors')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=professors.csv')
    async exportProfessorsAsCSV() {
        return await this.exportService.exportProfessorsAsCSV();
    }

    @Get('schedules')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=schedules.csv')
    async exportSchedulesAsCSV() {
        return await this.exportService.exportSchedulesAsCSV();
    }

    @Get('schedule-types')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=scheduleTypes.csv')
    async exportScheduleTypesAsCSV() {
        return await this.exportService.exportScheduleTypesAsCSV();
    }

    @Get('availability-schedules/professors/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', `attachment;filename=professors.dat`)
    async exportProfessorsAvailabilityScheduleAsBinary(
        @Param('cycleId')
        cycleId: number
    ) {
        return await this.exportService.exportProfessorsAvailabilityScheduleAsBinary(
            cycleId
        );
    }

    @Get('availability-schedules/classrooms/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', 'attachment;filename=classrooms.dat')
    async exportClassroomsAvailabilityScheduleAsBinary(
        @Param('cycleId')
        cycleId: number
    ) {
        return await this.exportService.exportClassroomsAvailabilityScheduleAsBinary(
            cycleId
        );
    }
}
