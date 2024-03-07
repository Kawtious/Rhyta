import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CourseUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    courseKey?: string;

    @IsOptional()
    @IsNotEmpty()
    classKey?: string;

    @IsOptional()
    @IsNotEmpty()
    scheduleKey?: string;

    @IsOptional()
    @IsNotEmpty()
    descriptionKey?: string;

    @IsOptional()
    @IsNotEmpty()
    careerId?: number;
}
