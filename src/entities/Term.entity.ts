import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from 'typeorm';

@Entity()
export class Term {
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
}
