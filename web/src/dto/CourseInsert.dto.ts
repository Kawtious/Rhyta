import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourseInsertDto {
    @IsNotEmpty()
    key!: string;

    @IsNotEmpty()
    schedule!: string;

    @IsNotEmpty()
    description!: string;

    @IsNumber()
    classroomId!: number;
}
