import { Career } from './Career.entity';
import { Course } from './Course.entity';

export class SemesterCareer {
    id?: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    semester?: number;

    start?: number;

    end?: number;

    career!: Career;

    course!: Course;
}
