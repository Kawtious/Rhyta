import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Schedule } from './Schedule.entity';

@Entity()
export class ScheduleType {
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
    description!: string;

    @Column({
        nullable: false
    })
    availableHours!: string;

    @Column({
        nullable: false
    })
    sessionMask!: string;

    @OneToMany(() => Schedule, (schedule) => schedule.scheduleType, {
        cascade: true
    })
    schedules!: Schedule[];
}
