import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { ProfessorEvent } from './ProfessorEvent.entity';

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
    name!: string;

    @OneToMany(() => ProfessorEvent, (event) => event.professor, {
        cascade: true
    })
    events!: ProfessorEvent[];
}
