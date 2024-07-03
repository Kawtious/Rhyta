import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CourseUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    key?: string;

    @IsOptional()
    @IsNotEmpty()
    schedule?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsNumber()
    classroomId?: number;
}
