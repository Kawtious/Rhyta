import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Career } from './Career.entity';
import { Course } from './Course.entity';

@Entity()
export class SemesterCareer {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @VersionColumn()
    version!: number;

    @Column({
        nullable: false
    })
    semester!: number;

    @Column({
        nullable: false
    })
    start!: number;

    @Column({
        nullable: false
    })
    end!: number;

    @ManyToOne(() => Career, (career) => career.semesterCareers, {
        nullable: false
    })
    @JoinColumn()
    career!: Relation<Career>;

    @ManyToOne(() => Course, (course) => course.semesterCareers, {
        nullable: false
    })
    @JoinColumn()
    course!: Relation<Course>;
}
