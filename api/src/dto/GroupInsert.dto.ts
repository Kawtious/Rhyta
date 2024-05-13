import { IsNumber } from 'class-validator';

export class GroupInsertDto {
    @IsNumber()
    firstNumberKey!: number;

    @IsNumber()
    secondNumberKey!: number;

    @IsNumber()
    courseId!: number;
}
