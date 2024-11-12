import { IsArray, IsOptional } from 'class-validator';

export class ExportSchedulesOptionsDto {
    @IsArray()
    @IsOptional()
    readonly scheduleIds?: number[] = [];
}
