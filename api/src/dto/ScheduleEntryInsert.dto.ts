import { IsBoolean, IsNumber, Max, Min } from 'class-validator';

export class ScheduleEntryInsertDto {
    @IsNumber()
    @Min(0)
    @Max(4)
    day!: number;

    @IsNumber()
    @Min(0)
    @Max(27)
    hour!: number;

    @IsBoolean()
    active!: boolean;
}
