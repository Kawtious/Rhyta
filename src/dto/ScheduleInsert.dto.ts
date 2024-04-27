import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IsOwnerNotConflicting } from '../decorators/IsOwnerNotConflicting.decorator';

export class ScheduleInsertDto {
    @IsOptional()
    @IsNumber()
    @IsOwnerNotConflicting('classroomId')
    professorId?: number;

    @IsOptional()
    @IsNumber()
    @IsOwnerNotConflicting('professorId')
    classroomId?: number;

    @IsNumber()
    cycleId!: number;

    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
