import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class AvailabilityScheduleEntryUpdateDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(4)
    day?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(27)
    hour?: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    value?: number;
}
