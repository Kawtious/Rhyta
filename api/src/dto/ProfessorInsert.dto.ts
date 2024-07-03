import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProfessorInsertDto {
    @IsNotEmpty()
    type!: string;

    @IsNumber()
    controlNumber!: number;

    @IsNotEmpty()
    name!: string;
}
