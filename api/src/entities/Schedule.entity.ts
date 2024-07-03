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

import { ScheduleType } from './ScheduleType.entity';

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
    type!: number;

    @Column({
        nullable: false
    })
    offset!: number;

    @ManyToOne(() => ScheduleType, (scheduleType) => scheduleType.schedules, {
        nullable: false
    })
    @JoinColumn()
    scheduleType!: Relation<ScheduleType>;
}
