import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CourseUpdateBulkDto {
    @IsNumber()
    id!: number;

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
