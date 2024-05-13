import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProfessorInsertDto {
    @IsNotEmpty()
    typeKey!: string;

    @IsNumber()
    controlNumberKey!: number;

    @IsNotEmpty()
    name!: string;
}
