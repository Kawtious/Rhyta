import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

import { IsOwnerNotConflicting } from '../decorators/IsOwnerNotConflicting.decorator';

export class ScheduleEntryUpdateDto {
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

    @IsNumber()
    cycleId!: number;

    @IsNumber()
    day!: number;

    @IsNumber()
    hour!: number;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
