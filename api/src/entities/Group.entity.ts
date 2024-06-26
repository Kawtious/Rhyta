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

import { Course } from './Course.entity';
import { Professor } from './Professor.entity';

@Entity()
@Unique(['firstNumberKey', 'course', 'professor'])
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

    @ManyToOne(() => Course, (course) => course.groups, {
        nullable: false
    })
    @JoinColumn()
    course!: Relation<Course>;

    @ManyToOne(() => Professor, (professor) => professor.groups, {
        nullable: false
    })
    @JoinColumn()
    professor!: Relation<Professor>;
}
