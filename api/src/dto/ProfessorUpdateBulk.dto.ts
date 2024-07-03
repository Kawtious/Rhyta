import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProfessorUpdateBulkDto {
    @IsNumber()
    id!: number;

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
