import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Permission } from '../enums/Permission.enum';
import { User } from './User.entity';

@Entity()
export class Role {
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

    @ManyToMany(() => User, (user) => user.roles)
    users!: User[];

    @Column({
        type: 'simple-array'
    })
    permissions!: Permission[];
}
