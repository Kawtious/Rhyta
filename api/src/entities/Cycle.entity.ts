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
export class Cycle {
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

    @OneToMany(() => Schedule, (schedules) => schedules.cycle, {
        cascade: true
    })
    schedules!: Schedule[];
}
