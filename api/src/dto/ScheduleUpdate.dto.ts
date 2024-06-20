import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { ScheduleEntryUpdateBulkDto } from './ScheduleEntryUpdateBulk.dto';

export class ScheduleUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsArray()
    entries?: ScheduleEntryUpdateBulkDto[];
}
