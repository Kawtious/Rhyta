import { IsNumber } from 'class-validator';

export class SemesterCareerInsertDto {
    @IsNumber()
    careerId!: number;

    @IsNumber()
    courseId!: number;

    @IsNumber()
    start!: number;

    @IsNumber()
    end!: number;

    @IsNumber()
    semester!: number;
}
