import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourseInsertDto {
    @IsNotEmpty()
    courseKey!: string;

    @IsNotEmpty()
    classKey!: string;

    @IsNotEmpty()
    scheduleKey!: string;

    @IsNotEmpty()
    descriptionKey!: string;

    @IsNotEmpty()
    careerId!: number;
}
