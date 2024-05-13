import { IsNumber } from 'class-validator';

export class ProgramInsertDto {
    @IsNumber()
    typeKey!: number;

    @IsNumber()
    offsetKey!: number;

    @IsNumber()
    programTypeId!: number;
}
