import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProfessorUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    typeKey?: string;

    @IsOptional()
    @IsNumber()
    controlNumberKey?: number;

    @IsOptional()
    @IsNotEmpty()
    name?: string;
}
