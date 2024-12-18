import { AvailabilitySchedule } from './AvailabilitySchedule.entity';

export class AvailabilityScheduleEntry {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    day!: number;

    hour!: number;

    value!: number;

    availabilitySchedule?: AvailabilitySchedule;
}
