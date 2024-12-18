import { AvailabilityScheduleEntry } from './AvailabilityScheduleEntry.entity';
import { Classroom } from './Classroom.entity';
import { Cycle } from './Cycle.entity';
import { Professor } from './Professor.entity';

export class AvailabilitySchedule {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version!: number;

    title?: string;

    description?: string;

    cycle?: Cycle;

    professor?: Professor;

    classroom?: Classroom;

    entries!: AvailabilityScheduleEntry[];
}
