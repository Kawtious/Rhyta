import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AvailabilityScheduleEntryUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
