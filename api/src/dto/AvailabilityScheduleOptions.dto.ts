import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class AvailabilityScheduleOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeCycle?: boolean = false;

    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeEntries?: boolean = false;
}
