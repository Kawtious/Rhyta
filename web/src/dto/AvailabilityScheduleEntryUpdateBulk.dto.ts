import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class AvailabilityScheduleEntryUpdateBulkDto {
    @IsNumber()
    @Min(0)
    @Max(4)
    day!: number;

    @IsNumber()
    @Min(0)
    @Max(27)
    hour!: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    value?: number;
}
