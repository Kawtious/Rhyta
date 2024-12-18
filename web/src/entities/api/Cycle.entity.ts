import { AvailabilitySchedule } from './AvailabilitySchedule.entity';

export class Cycle {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    title?: string;

    description?: string;

    availabilitySchedules?: AvailabilitySchedule[];
}
