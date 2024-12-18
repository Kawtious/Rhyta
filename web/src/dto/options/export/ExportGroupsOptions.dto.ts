import { IsArray, IsOptional } from 'class-validator';

export class ExportGroupsOptionsDto {
    @IsArray()
    @IsOptional()
    readonly groupIds?: number[] = [];
}
