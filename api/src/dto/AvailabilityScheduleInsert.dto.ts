import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { AvailabilityScheduleEntryInsertDto } from './AvailabilityScheduleEntryInsert.dto';

export class AvailabilityScheduleInsertDto {
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsArray()
    entries?: AvailabilityScheduleEntryInsertDto[];
}
