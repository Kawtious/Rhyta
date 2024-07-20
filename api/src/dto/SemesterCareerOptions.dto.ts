import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class SemesterCareerOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeCareer?: boolean = false;

    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeCourse?: boolean = false;
}
