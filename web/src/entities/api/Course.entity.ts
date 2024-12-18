import { Classroom } from './Classroom.entity';
import { Group } from './Group.entity';
import { SemesterCareer } from './SemesterCareer.entity';

export class Course {
    id!: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    key?: string;

    schedule?: string;

    description?: string;

    classroom?: Classroom;

    semesterCareers?: SemesterCareer[];

    groups?: Group[];
}
