import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class ScheduleEntryUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
