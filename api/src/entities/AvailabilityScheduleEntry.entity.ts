import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    Unique,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { AvailabilitySchedule } from './AvailabilitySchedule.entity';

@Entity()
@Unique(['day', 'hour', 'availabilitySchedule'])
export class AvailabilityScheduleEntry {
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

    @ManyToOne(
        () => AvailabilitySchedule,
        (availabilitySchedule) => availabilitySchedule.entries,
        {
            nullable: false
        }
    )
    @JoinColumn()
    availabilitySchedule!: Relation<AvailabilitySchedule>;
}
