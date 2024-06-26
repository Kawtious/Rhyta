import { IsNumber } from 'class-validator';

export class GroupInsertDto {
    @IsNumber()
    firstNumberKey!: number;

    @IsNumber()
    professorId!: number;

    @IsNumber()
    courseId!: number;
}
