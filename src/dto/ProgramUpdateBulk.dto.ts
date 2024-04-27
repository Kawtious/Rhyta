import { IsNumber, IsOptional } from 'class-validator';

export class ProgramUpdateBulkDto {
    @IsNumber()
    id!: number;

    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    typeKey?: number;

    @IsOptional()
    @IsNumber()
    offsetKey?: number;

    @IsOptional()
    @IsNumber()
    programTypeId?: number;
}
