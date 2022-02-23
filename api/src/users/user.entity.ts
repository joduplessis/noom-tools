import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    name: string

    @Column()
    password: string

    @Column({ nullable: true })
    image: string

    @Column({ unique: true })
    email: string

    @Column({ default: true })
    active: boolean

    @Column({ nullable: true })
    resetToken: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
