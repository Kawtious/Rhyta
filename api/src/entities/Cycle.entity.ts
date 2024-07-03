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

    @OneToMany(
        () => AvailabilitySchedule,
        (availabilitySchedules) => availabilitySchedules.cycle,
        {
            cascade: true
        }
    )
    availabilitySchedules!: AvailabilitySchedule[];
}
