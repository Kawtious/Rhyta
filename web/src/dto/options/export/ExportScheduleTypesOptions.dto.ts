import { IsArray, IsOptional } from 'class-validator';

export class ExportScheduleTypesOptionsDto {
    @IsArray()
    @IsOptional()
    readonly scheduleTypeIds?: number[] = [];
}
