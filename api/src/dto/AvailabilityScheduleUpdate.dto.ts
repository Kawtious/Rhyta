import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { AvailabilityScheduleEntryUpdateDto } from './AvailabilityScheduleEntryUpdate.dto';

export class AvailabilityScheduleUpdateDto {
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
    entries?: AvailabilityScheduleEntryUpdateDto[];
}
