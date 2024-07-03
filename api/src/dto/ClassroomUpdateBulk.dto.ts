import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ClassroomUpdateBulkDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    type?: string;
}
