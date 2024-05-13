import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Path } from './Path.entity';

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
    careerKey!: string;

    @OneToMany(() => Path, (path) => path.career, {
        cascade: true
    })
    paths!: Path[];
}
