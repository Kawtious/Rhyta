import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CourseUpdateBulkDto {
    @IsNumber()
    id!: number;

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
