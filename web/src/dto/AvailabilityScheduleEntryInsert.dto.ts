import { IsNumber, Max, Min } from 'class-validator';

export class AvailabilityScheduleEntryInsertDto {
    @IsNumber()
    @Min(0)
    @Max(4)
    day!: number;

    @IsNumber()
    @Min(0)
    @Max(27)
    hour!: number;

    @IsNumber()
    @Min(0)
    value!: number;
}
