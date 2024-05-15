import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

import { Permission } from '../enums/Permission.enum';
import { Role } from './Role.entity';

@Entity()
export class User {
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
    username!: string;

    @Column({
        nullable: false,
        unique: true
    })
    email!: string;

    @Column({
        nullable: false
    })
    password!: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({ name: 'user_role' })
    roles!: Role[];

    @Column({
        type: 'simple-array'
    })
    permissions!: Permission[];
}
