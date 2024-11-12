import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ScheduleTypeUpdateDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    availableHours?: string;

    @IsOptional()
    @IsNotEmpty()
    sessionMask?: string;
}
