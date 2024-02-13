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

import { Professor } from './Professor.entity';

@Entity()
export class ProfessorEvent {
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
    title!: string;

    @Column()
    description!: string;

    @Column({
        nullable: false
    })
    startDate!: Date;

    @Column({
        nullable: false
    })
    endDate!: Date;

    @ManyToOne(() => Professor, (professor) => professor.events, {
        nullable: false
    })
    @JoinColumn()
    professor!: Relation<Professor>;
}
