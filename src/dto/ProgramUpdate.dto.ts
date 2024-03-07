import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProgramUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    typeKey?: number;

    @IsOptional()
    @IsNumber()
    offsetKey?: number;

    @IsOptional()
    @IsNumber()
    programTypeId?: number;
}
