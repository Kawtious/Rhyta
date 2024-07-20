import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GroupOptionsDto {
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeCourse?: boolean = false;

    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    @IsOptional()
    readonly includeProfessor?: boolean = false;
}
