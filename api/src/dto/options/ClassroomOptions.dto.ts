import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ClassroomOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeAvailabilitySchedules?: boolean = false;
}
