import { IsNotEmpty } from 'class-validator';

export class ScheduleTypeInsertDto {
    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    availableHours!: string;

    @IsNotEmpty()
    sessionMask!: string;
}
