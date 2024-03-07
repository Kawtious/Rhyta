import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProgramTypeUpdateDto {
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
