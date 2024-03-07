import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Course } from './Course.entity';

@Entity()
export class Career {
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
    careerKey!: string;

    @Column({
        nullable: false
    })
    pathStartKey!: number;

    @Column({
        nullable: false
    })
    pathEndKey!: number;

    @OneToMany(() => Course, (course) => course.career, {
        cascade: true
    })
    courses!: Course[];
}
