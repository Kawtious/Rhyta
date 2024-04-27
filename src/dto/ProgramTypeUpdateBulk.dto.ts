import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProgramTypeUpdateBulkDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    descriptionKey?: string;

    @IsOptional()
    @IsNotEmpty()
    availableHoursKey?: string;

    @IsOptional()
    @IsNotEmpty()
    sessionMaskKey?: string;
}
