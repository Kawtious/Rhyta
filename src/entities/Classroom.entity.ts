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
        nullable: false
    })
    typeKey!: string;

    @OneToMany(() => Schedule, (schedule) => schedule.classroom, {
        cascade: true
    })
    schedules!: Schedule[];
}
