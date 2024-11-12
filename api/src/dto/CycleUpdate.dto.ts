import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CycleUpdateDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
