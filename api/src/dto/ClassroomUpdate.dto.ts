import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ClassroomUpdateDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    type?: string;
}
