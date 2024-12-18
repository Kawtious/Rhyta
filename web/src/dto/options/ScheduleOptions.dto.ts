import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ScheduleOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeScheduleType?: boolean = false;
}
