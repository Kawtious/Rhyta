import { IsArray, IsOptional } from 'class-validator';

export class ExportSemesterCareersOptionsDto {
    @IsArray()
    @IsOptional()
    readonly semesterCareerIds?: number[] = [];
}
