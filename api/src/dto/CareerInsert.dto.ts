import { IsNotEmpty } from 'class-validator';

export class CareerInsertDto {
    @IsNotEmpty()
    key!: string;
}
