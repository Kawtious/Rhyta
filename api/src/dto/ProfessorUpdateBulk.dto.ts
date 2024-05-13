import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProfessorUpdateBulkDto {
    @IsNumber()
    id!: number;

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
