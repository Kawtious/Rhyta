import { IsNumber, IsOptional } from 'class-validator';

export class SemesterCareerUpdateDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    careerId?: number;

    @IsOptional()
    @IsNumber()
    courseId?: number;

    @IsOptional()
    @IsNumber()
    start!: number;

    @IsOptional()
    @IsNumber()
    end!: number;

    @IsOptional()
    @IsNumber()
    semester?: number;
}
