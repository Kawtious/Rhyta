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

import { Course } from './Course.entity';

@Entity()
export class Group {
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
    firstNumberKey!: number;

    @Column({
        nullable: false
    })
    secondNumberKey!: number;

    @ManyToOne(() => Course, (course) => course.groups, {
        nullable: false
    })
    @JoinColumn()
    course!: Relation<Course>;
}
