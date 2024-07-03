import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    Unique,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { AvailabilityScheduleEntry } from './AvailabilityScheduleEntry.entity';
import { Classroom } from './Classroom.entity';
import { Cycle } from './Cycle.entity';
import { Professor } from './Professor.entity';

@Entity()
@Unique(['cycle', 'professor'])
@Unique(['cycle', 'classroom'])
export class AvailabilitySchedule {
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
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Cycle, (cycle) => cycle.availabilitySchedules, {
        nullable: true
    })
    @JoinColumn()
    cycle?: Relation<Cycle>;

    @ManyToOne(
        () => Professor,
        (professor) => professor.availabilitySchedules,
        {
            nullable: true
        }
    )
    @JoinColumn()
    professor?: Relation<Professor>;

    @ManyToOne(
        () => Classroom,
        (classroom) => classroom.availabilitySchedules,
        {
            nullable: true
        }
    )
    @JoinColumn()
    classroom?: Relation<Classroom>;

    @OneToMany(
        () => AvailabilityScheduleEntry,
        (entries) => entries.availabilitySchedule,
        {
            cascade: true
        }
    )
    entries!: AvailabilityScheduleEntry[];
}
