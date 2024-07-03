import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { SemesterCareer } from './SemesterCareer.entity';

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
        nullable: false,
        unique: true
    })
    key!: string;

    @OneToMany(
        () => SemesterCareer,
        (semesterCareer) => semesterCareer.career,
        {
            cascade: true
        }
    )
    semesterCareers!: SemesterCareer[];
}
