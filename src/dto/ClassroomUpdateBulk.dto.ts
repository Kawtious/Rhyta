import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClassroomUpdateBulkDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    version!: number;

    @IsNotEmpty()
    typeKey!: string;
}
