import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CareerUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    key?: string;
}
