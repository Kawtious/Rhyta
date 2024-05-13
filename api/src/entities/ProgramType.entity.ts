import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Program } from './Program.entity';

@Entity()
export class ProgramType {
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
    descriptionKey!: string;

    @Column({
        nullable: false
    })
    availableHoursKey!: string;

    @Column({
        nullable: false
    })
    sessionMaskKey!: string;

    @OneToMany(() => Program, (program) => program.programType, {
        cascade: true
    })
    programs!: Program[];
}
