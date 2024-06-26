import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Course } from './Course.entity';
import { Schedule } from './Schedule.entity';

@Entity()
export class Classroom {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @VersionColumn()
    version!: number;

    @Column({
        nullable: false,
        unique: true
    })
    typeKey!: string;

    @OneToMany(() => Course, (course) => course.classroom, {
        cascade: true
    })
    courses!: Course[];

    @OneToMany(() => Schedule, (schedule) => schedule.classroom, {
        cascade: true
    })
    schedules!: Schedule[];
}
