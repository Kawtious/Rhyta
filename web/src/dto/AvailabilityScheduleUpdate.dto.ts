import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { AvailabilityScheduleEntryUpdateBulkDto } from './AvailabilityScheduleEntryUpdateBulk.dto';

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
    entries?: AvailabilityScheduleEntryUpdateBulkDto[];
}
