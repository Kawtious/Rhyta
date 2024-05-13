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
import { Path } from './Path.entity';

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
    courseKey!: string;

    @Column({
        nullable: false
    })
    scheduleKey!: string;

    @Column({
        nullable: false
    })
    descriptionKey!: string;

    @ManyToOne(() => Classroom, (classroom) => classroom.courses, {
        nullable: false
    })
    @JoinColumn()
    classroom!: Relation<Classroom>;

    @OneToMany(() => Path, (path) => path.course, {
        cascade: true
    })
    paths!: Path[];

    @OneToMany(() => Group, (group) => group.course, {
        cascade: true
    })
    groups!: Group[];
}
