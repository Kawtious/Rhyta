import { IsNumber, IsOptional } from 'class-validator';

export class GroupUpdateDto {
    @IsOptional()
    @IsNumber()
    id?: number;

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
