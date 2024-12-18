import { IsNumber, IsOptional, Min } from 'class-validator';

export class AvailabilityScheduleEntryUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    value?: number;
}
