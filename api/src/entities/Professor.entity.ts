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
import { Group } from './Group.entity';

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
    type!: string;

    @Column({
        nullable: false,
        unique: true
    })
    controlNumber!: number;

    @Column({
        nullable: false
    })
    name!: string;

    @OneToMany(
        () => AvailabilitySchedule,
        (availabilitySchedule) => availabilitySchedule.professor,
        {
            cascade: true
        }
    )
    availabilitySchedules!: AvailabilitySchedule[];

    @OneToMany(() => Group, (group) => group.professor, {
        cascade: true
    })
    groups!: Group[];
}
