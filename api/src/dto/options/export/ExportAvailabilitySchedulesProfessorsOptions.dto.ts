import { IsArray, IsOptional } from 'class-validator';

export class ExportAvailabilitySchedulesProfessorsOptionsDto {
    @IsArray()
    @IsOptional()
    readonly professorIds?: number[] = [];
}
