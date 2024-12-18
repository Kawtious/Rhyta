import { IsNotEmpty } from 'class-validator';

export class ClassroomInsertDto {
    @IsNotEmpty()
    type!: string;
}
