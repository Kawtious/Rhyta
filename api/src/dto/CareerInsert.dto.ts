import { IsNotEmpty } from 'class-validator';

export class CareerInsertDto {
    @IsNotEmpty()
    careerKey!: string;
}
