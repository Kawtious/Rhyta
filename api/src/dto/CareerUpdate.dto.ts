import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CareerUpdateDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    key?: string;
}
