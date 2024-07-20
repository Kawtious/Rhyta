import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ProfessorOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeAvailabilitySchedules?: boolean = false;

    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeGroups?: boolean = false;
}
