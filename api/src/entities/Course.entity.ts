import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Classroom } from './Classroom.entity';
import { Group } from './Group.entity';
import { SemesterCareer } from './SemesterCareer.entity';

@Entity()
export class Course {
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
    key!: string;

    @Column({
        nullable: false
    })
    schedule!: string;

    @Column({
        nullable: false
    })
    description!: string;

    @ManyToOne(() => Classroom, (classroom) => classroom.courses, {
        nullable: false
    })
    @JoinColumn()
    classroom!: Relation<Classroom>;

    @OneToMany(
        () => SemesterCareer,
        (semesterCareer) => semesterCareer.course,
        {
            cascade: true
        }
    )
    semesterCareers!: SemesterCareer[];

    @OneToMany(() => Group, (group) => group.course, {
        cascade: true
    })
    groups!: Group[];
}
