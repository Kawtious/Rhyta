import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { ScheduleEntryInsertDto } from './ScheduleEntryInsert.dto';

export class ScheduleInsertDto {
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsArray()
    entries?: ScheduleEntryInsertDto[];
}
