import {
    Controller,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Query
} from '@nestjs/common';

import { ExportAvailabilitySchedulesClassroomsOptionsDto } from '../dto/options/export/ExportAvailabilitySchedulesClassroomsOptions.dto';
import { ExportAvailabilitySchedulesProfessorsOptionsDto } from '../dto/options/export/ExportAvailabilitySchedulesProfessorsOptions.dto';
import { ExportCoursesOptionsDto } from '../dto/options/export/ExportCoursesOptions.dto';
import { ExportGroupsOptionsDto } from '../dto/options/export/ExportGroupsOptions.dto';
import { ExportProfessorsOptionsDto } from '../dto/options/export/ExportProfessorsOptions.dto';
import { ExportScheduleTypesOptionsDto } from '../dto/options/export/ExportScheduleTypesOptions.dto';
import { ExportSchedulesOptionsDto } from '../dto/options/export/ExportSchedulesOptions.dto';
import { ExportSemesterCareersOptionsDto } from '../dto/options/export/ExportSemesterCareersOptions.dto';
import { ExportService } from '../services/Export.service';

@Controller({ path: 'export', version: '1' })
export class ExportController {
    constructor(private readonly exportService: ExportService) {}

    @Get('courses')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=courses.csv')
    async exportCoursesAsCSV(
        @Query() exportCoursesOptions: ExportCoursesOptionsDto
    ) {
        return await this.exportService.exportCoursesAsCSV(
            exportCoursesOptions
        );
    }

    @Get('groups')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=groups.csv')
    async exportGroupsAsCSV(
        @Query() exportGroupsOptionsDto: ExportGroupsOptionsDto
    ) {
        return await this.exportService.exportGroupsAsCSV(
            exportGroupsOptionsDto
        );
    }

    @Get('semester-careers')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=semester_careers.csv')
    async exportSemesterCareersAsCSV(
        @Query()
        exportSemesterCareersOptionsDto: ExportSemesterCareersOptionsDto
    ) {
        return await this.exportService.exportSemesterCareersAsCSV(
            exportSemesterCareersOptionsDto
        );
    }

    @Get('professors')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=professors.csv')
    async exportProfessorsAsCSV(
        @Query() exportProfessorsOptionsDto: ExportProfessorsOptionsDto
    ) {
        return await this.exportService.exportProfessorsAsCSV(
            exportProfessorsOptionsDto
        );
    }

    @Get('schedules')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=schedules.csv')
    async exportSchedulesAsCSV(
        @Query() exportSchedulesOptionsDto: ExportSchedulesOptionsDto
    ) {
        return await this.exportService.exportSchedulesAsCSV(
            exportSchedulesOptionsDto
        );
    }

    @Get('schedule-types')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'text/csv')
    @Header('Content-Disposition', 'attachment;filename=scheduleTypes.csv')
    async exportScheduleTypesAsCSV(
        @Query() exportScheduleTypesOptionsDto: ExportScheduleTypesOptionsDto
    ) {
        return await this.exportService.exportScheduleTypesAsCSV(
            exportScheduleTypesOptionsDto
        );
    }

    @Get('availability-schedules/professors/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', `attachment;filename=professors.dat`)
    async exportAvailabilityScheduleProfessorsAsBinary(
        @Param('cycleId')
        cycleId: number,
        @Query()
        exportAvailabilitySchedulesProfessorsOptionsDto: ExportAvailabilitySchedulesProfessorsOptionsDto
    ) {
        return await this.exportService.exportAvailabilityScheduleProfessorsAsBinary(
            cycleId,
            exportAvailabilitySchedulesProfessorsOptionsDto
        );
    }

    @Get('availability-schedules/classrooms/:cycleId')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/octet-stream')
    @Header('Content-Disposition', 'attachment;filename=classrooms.dat')
    async exportAvailabilityScheduleClassroomsAsBinary(
        @Param('cycleId')
        cycleId: number,
        @Query()
        exportAvailabilitySchedulesClassroomsOptionsDto: ExportAvailabilitySchedulesClassroomsOptionsDto
    ) {
        return await this.exportService.exportAvailabilityScheduleClassroomsAsBinary(
            cycleId,
            exportAvailabilitySchedulesClassroomsOptionsDto
        );
    }
}
