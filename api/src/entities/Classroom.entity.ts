import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { AvailabilitySchedule } from './AvailabilitySchedule.entity';
import { Course } from './Course.entity';

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
    type!: string;

    @OneToMany(() => Course, (course) => course.classroom, {
        cascade: true
    })
    courses!: Course[];

    @OneToMany(
        () => AvailabilitySchedule,
        (availabilitySchedule) => availabilitySchedule.classroom,
        {
            cascade: true
        }
    )
    availabilitySchedules!: AvailabilitySchedule[];
}
