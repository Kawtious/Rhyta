import { IsNumber, IsOptional } from 'class-validator';

export class ScheduleUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    type?: number;

    @IsOptional()
    @IsNumber()
    offset?: number;

    @IsOptional()
    @IsNumber()
    scheduleTypeId?: number;
}
