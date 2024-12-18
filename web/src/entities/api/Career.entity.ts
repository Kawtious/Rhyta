import { SemesterCareer } from './SemesterCareer.entity';

export class Career {
    id!: number;

    createdDate?: Date;

    updatedDate?: Date;

    version?: number;

    key?: string;

    semesterCareers?: SemesterCareer[];
}
