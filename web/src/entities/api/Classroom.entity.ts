import { AvailabilitySchedule } from './AvailabilitySchedule.entity';
import { Course } from './Course.entity';

export class Classroom {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    type?: string;

    courses?: Course[];

    availabilitySchedules?: AvailabilitySchedule[];
}
