import { AvailabilitySchedule } from './AvailabilitySchedule.entity';
import { Group } from './Group.entity';

export class Professor {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    type?: string;

    controlNumber?: number;

    name?: string;

    availabilitySchedules?: AvailabilitySchedule[];

    groups?: Group[];
}
