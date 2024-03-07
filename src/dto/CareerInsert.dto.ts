import { IsNotEmpty, IsNumber } from 'class-validator';

export class CareerInsertDto {
    @IsNotEmpty()
    careerKey!: string;

    @IsNotEmpty()
    subjectKey!: string;

    @IsNumber()
    pathStartKey!: number;

    @IsNumber()
    pathEndKey!: number;
}
