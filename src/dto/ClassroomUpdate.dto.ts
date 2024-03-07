import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClassroomUpdateDto {
    @IsNumber()
    version!: number;

    @IsNotEmpty()
    typeKey!: string;
}
