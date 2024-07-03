import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CareerUpdateBulkDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    key?: string;
}
