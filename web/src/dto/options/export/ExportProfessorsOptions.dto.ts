import { IsArray, IsOptional } from 'class-validator';

export class ExportProfessorsOptionsDto {
    @IsArray()
    @IsOptional()
    readonly professorIds?: number[] = [];
}
