import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IsOwnerNotConflicting } from '../decorators/IsOwnerNotConflicting.decorator';

export class ScheduleUpdateDto {
    @IsNumber()
    version!: number;

    @IsOptional()
    @IsNumber()
    @IsOwnerNotConflicting('classroomId')
    professorId?: number;

    @IsOptional()
    @IsNumber()
    @IsOwnerNotConflicting('professorId')
    classroomId?: number;

    @IsOptional()
    @IsNumber()
    cycleId?: number;

    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;
}
