import { ScheduleType } from './ScheduleType.entity';

export class Schedule {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    type?: number;

    offset?: number;

    scheduleType?: ScheduleType;
}
