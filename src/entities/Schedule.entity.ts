import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Classroom } from './Classroom.entity';
import { Cycle } from './Cycle.entity';
import { Professor } from './Professor.entity';
import { ScheduleEntry } from './ScheduleEntry.entity';

@Entity()
export class Schedule {
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

    @ManyToOne(() => Cycle, (cycle) => cycle.schedules, {
        nullable: true
    })
    @JoinColumn()
    cycle?: Relation<Cycle>;

    @ManyToOne(() => Professor, (professor) => professor.schedules, {
        nullable: true
    })
    @JoinColumn()
    professor?: Relation<Professor>;

    @ManyToOne(() => Classroom, (classroom) => classroom.schedules, {
        nullable: true
    })
    @JoinColumn()
    classroom?: Relation<Classroom>;

    @OneToMany(() => ScheduleEntry, (entries) => entries.schedule, {
        cascade: true
    })
    entries!: ScheduleEntry[];
}
