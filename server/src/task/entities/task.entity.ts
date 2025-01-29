
import { User } from 'src/users/entities';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    
    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ default: false })
    isCompleted: boolean;

    @Column({ type: 'enum', enum: ['Sin Iniciar', 'En Proceso', 'Completada'], default: 'Sin Iniciar' })
    status: string;

    @ManyToOne(() => (User), user => user.tasks)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
