import { IsArray, IsOptional } from 'class-validator';

export class ExportCoursesOptionsDto {
    @IsArray()
    @IsOptional()
    readonly courseIds?: number[] = [];
}
