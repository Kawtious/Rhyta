import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ScheduleInsertDto {
    @IsNumber()
    cycleId!: number;

    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
