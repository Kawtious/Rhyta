import { Schedule } from './Schedule.entity';

export class ScheduleType {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    description?: string;

    availableHours?: string;

    sessionMask?: string;

    schedules?: Schedule[];
}
