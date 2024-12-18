import { IsNumber, IsOptional } from 'class-validator';

export class GroupUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    group?: number;

    @IsOptional()
    @IsNumber()
    professorId?: number;

    @IsOptional()
    @IsNumber()
    courseId?: number;
}
