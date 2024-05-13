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

import { ProgramType } from './ProgramType.entity';

@Entity()
export class Program {
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
    typeKey!: number;

    @Column({
        nullable: false
    })
    offsetKey!: number;

    @ManyToOne(() => ProgramType, (programType) => programType.programs, {
        nullable: false
    })
    @JoinColumn()
    programType!: Relation<ProgramType>;
}
