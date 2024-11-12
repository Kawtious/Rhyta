import { IsArray, IsOptional } from 'class-validator';

export class ExportAvailabilitySchedulesClassroomsOptionsDto {
    @IsArray()
    @IsOptional()
    readonly classroomIds?: number[] = [];
}
