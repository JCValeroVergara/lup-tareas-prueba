import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {

    @ApiProperty({ required: true, description: 'Título de la tarea' })
    @IsString()
    title: string;

    @ApiProperty({ required: false, description: 'Descripción de la tarea' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ required: false, description: 'Estado de la tarea', default: false })
    @IsOptional()
    @IsBoolean()
    isCompleted: boolean;
    
    @ApiProperty({ required: false, description: 'Estado de la tarea', enum: ['Sin Iniciar', 'En Proceso', 'Completada'] })
    @IsOptional()
    @IsIn(['Sin Iniciar', 'En Proceso', 'Completada'])
    status?: string;

    @ApiProperty({ required: true, description: 'Usuario de la tarea' })
    @IsString()
    userId: string;

}
