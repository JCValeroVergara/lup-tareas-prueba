import { Task } from 'src/task/entities';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    checkEmailBeforeInsert() {
        if (this.email) this.email = this.email.toLowerCase();
    }

    @BeforeInsert()
    @BeforeUpdate()
    checkNameBeforeInsert() {
        if (this.name) {
            this.name = this.name
                .toLowerCase()
                .split(' ')
                .filter((word) => word.trim() !== '')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
                .join(' ');
        }
    }
}
