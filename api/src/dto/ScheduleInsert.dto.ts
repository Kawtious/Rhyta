import { IsNumber } from 'class-validator';

export class ScheduleInsertDto {
    @IsNumber()
    type!: number;

    @IsNumber()
    offset!: number;

    @IsNumber()
    scheduleTypeId!: number;
}
