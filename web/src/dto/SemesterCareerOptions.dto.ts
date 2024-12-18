import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class SemesterCareerOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeCareers?: boolean = false;

    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeCourses?: boolean = false;
}
