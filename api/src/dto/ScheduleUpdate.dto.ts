import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ScheduleUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
