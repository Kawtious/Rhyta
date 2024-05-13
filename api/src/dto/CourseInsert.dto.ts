import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourseInsertDto {
    @IsNotEmpty()
    courseKey!: string;

    @IsNotEmpty()
    scheduleKey!: string;

    @IsNotEmpty()
    descriptionKey!: string;

    @IsNumber()
    classroomId!: number;
}
