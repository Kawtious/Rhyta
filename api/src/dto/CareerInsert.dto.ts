import { IsNotEmpty } from 'class-validator';

export class CareerInsertDto {
    @IsNotEmpty()
    career!: string;
}
