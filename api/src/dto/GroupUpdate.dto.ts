import { IsNumber, IsOptional } from 'class-validator';

export class GroupUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    firstNumberKey?: number;

    @IsOptional()
    @IsNumber()
    professorId?: number;

    @IsOptional()
    @IsNumber()
    courseId?: number;
}
