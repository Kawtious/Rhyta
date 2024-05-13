import { IsNumber } from 'class-validator';

export class PathInsertDto {
    @IsNumber()
    careerId!: number;

    @IsNumber()
    courseId!: number;

    @IsNumber()
    pathStartKey!: number;

    @IsNumber()
    pathEndKey!: number;
}
