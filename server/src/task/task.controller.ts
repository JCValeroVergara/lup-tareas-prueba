import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dtos';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tareas')
@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Error al crear tarea' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de tareas' })
    @ApiResponse({ status: 400, description: 'Error al obtener tareas' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    findAll(@Query() paginationDto: PaginationDto) {
        return this.taskService.findAll( paginationDto );
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Tarea encontrada' })
    @ApiResponse({ status: 400, description: 'Error al obtener tarea' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @Get('user/:userId')
    @ApiResponse({ status: 200, description: 'Listado de tareas del usuario' })
    @ApiResponse({ status: 400, description: 'Error al obtener tareas del usuario' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    async findAllByUser(@Param('userId') userId: string) {
        return this.taskService.findAllByUser(userId);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Tarea actualizada' })
    @ApiResponse({ status: 400, description: 'Error al actualizar tarea' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Tarea eliminada' })
    @ApiResponse({ status: 400, description: 'Error al eliminar tarea' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}
