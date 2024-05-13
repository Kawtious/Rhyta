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

import { Career } from './Career.entity';
import { Course } from './Course.entity';

@Entity()
export class Path {
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
    pathStartKey!: number;

    @Column({
        nullable: false
    })
    pathEndKey!: number;

    @ManyToOne(() => Career, (career) => career.paths, {
        nullable: false
    })
    @JoinColumn()
    career!: Relation<Career>;

    @ManyToOne(() => Course, (course) => course.paths, {
        nullable: false
    })
    @JoinColumn()
    course!: Relation<Course>;
}
