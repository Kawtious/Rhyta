import { IsNumber } from 'class-validator';

export class GroupInsertDto {
    @IsNumber()
    group!: number;

    @IsNumber()
    professorId!: number;

    @IsNumber()
    courseId!: number;
}
