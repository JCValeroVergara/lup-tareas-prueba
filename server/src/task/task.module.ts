import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities';

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports: [
        TypeOrmModule.forFeature([
            Task,
        ]),
    ],
})
export class TaskModule {}
