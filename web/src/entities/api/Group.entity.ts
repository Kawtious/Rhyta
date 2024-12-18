import { Course } from './Course.entity';
import { Professor } from './Professor.entity';

export class Group {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    group?: number;

    course?: Course;

    professor?: Professor;
}
