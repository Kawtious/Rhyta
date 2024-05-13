import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CycleUpdateBulkDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
