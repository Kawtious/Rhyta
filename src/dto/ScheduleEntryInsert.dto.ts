import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

import { IsOwnerNotConflicting } from '../decorators/IsOwnerNotConflicting.decorator';

export class ScheduleEntryInsertDto {
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

    @IsNumber()
    day!: number;

    @IsNumber()
    hour!: number;

    @IsBoolean()
    active!: boolean;
}
