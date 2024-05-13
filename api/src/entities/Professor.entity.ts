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
export class Professor {
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

    @Column({
        nullable: false
    })
    controlNumberKey!: number;

    @Column({
        nullable: false
    })
    name!: string;

    @OneToMany(() => Schedule, (schedule) => schedule.professor, {
        cascade: true
    })
    schedules!: Schedule[];
}
