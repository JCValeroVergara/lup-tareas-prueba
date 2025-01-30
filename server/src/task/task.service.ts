import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos';
import { User } from 'src/users/entities';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    
    private async findTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new BadRequestException(`Tarea con Id: ${id} no encontrada`);
        }
        return task;
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const user = await this.userRepository.findOne({ where: { id: createTaskDto.userId } });
            if (!user) {
                throw new BadRequestException(`Usuario con Id: ${createTaskDto.userId} no encontrado`);
            }

            delete user.password;
            delete user.email;

            const task = this.taskRepository.create({
                ...createTaskDto,
                user
            });
            await this.taskRepository.save(task);

            return task;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<Task[]> {
        const { limit, offset } = paginationDto;
        return await this.taskRepository.find({
            skip: offset,
            take: limit
        });
    }

    async findAllByUser(userId: string): Promise<Task[]> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new BadRequestException(`Usuario con Id: ${userId} no encontrado`);
        }

        const tasks = await this.taskRepository.find({ where: { user: { id: userId } } });
        return tasks;
    }

    async findOne(id: string): Promise<Task> {
        const task = await this.findTaskById(id);
        return task;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        const task = await this.findTaskById(id);
        
        Object.assign(task, updateTaskDto);
        const taskUpdated = await this.taskRepository.save(task);

        return taskUpdated;
    }

    async remove(id: string) {
        await this.findTaskById(id);
        await this.taskRepository.update(id, { active: false });

        return {
            message: `Tarea con Id: ${id} desactivada`
        }
    }
}
