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

import { Schedule } from './Schedule.entity';

@Entity()
export class ScheduleEntry {
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
    day!: number;

    @Column({
        nullable: false
    })
    hour!: number;

    @Column({
        nullable: false
    })
    active!: boolean;

    @ManyToOne(() => Schedule, (schedule) => schedule.entries, {
        nullable: false
    })
    @JoinColumn()
    schedule!: Relation<Schedule>;
}
