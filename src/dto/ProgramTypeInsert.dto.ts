import { IsNotEmpty } from 'class-validator';

export class ProgramTypeInsertDto {
    @IsNotEmpty()
    descriptionKey!: string;

    @IsNotEmpty()
    availableHoursKey!: string;

    @IsNotEmpty()
    sessionMaskKey!: string;
}
