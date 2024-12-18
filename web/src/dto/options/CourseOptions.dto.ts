import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class CourseOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeClassrooms?: boolean = false;
}
