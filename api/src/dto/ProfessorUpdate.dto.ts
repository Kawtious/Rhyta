import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProfessorUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    type?: string;

    @IsOptional()
    @IsNumber()
    controlNumber?: number;

    @IsOptional()
    @IsNotEmpty()
    name?: string;
}
