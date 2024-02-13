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
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Career, (career) => career.courses, {
        nullable: false
    })
    @JoinColumn()
    career!: Relation<Career>;
}
