import { IsNotEmpty, IsOptional } from 'class-validator';

export class CycleInsertDto {
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
