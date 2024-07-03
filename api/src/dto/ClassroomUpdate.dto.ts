import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ClassroomUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    type?: string;
}
