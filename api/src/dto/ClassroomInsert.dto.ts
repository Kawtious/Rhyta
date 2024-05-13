import { IsNotEmpty } from 'class-validator';

export class ClassroomInsertDto {
    @IsNotEmpty()
    typeKey!: string;
}
