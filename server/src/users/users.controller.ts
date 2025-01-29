import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Error al crear usuario' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de usuarios' })
    @ApiResponse({ status: 400, description: 'Error al obtener usuarios' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    findAll(
        @Query() paginationDto: PaginationDto
    ) {
        return this.usersService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 400, description: 'Error al obtener usuario' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Usuario actualizado' })
    @ApiResponse({ status: 400, description: 'Error al actualizar usuario' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Usuario eliminado' })
    @ApiResponse({ status: 400, description: 'Error al eliminar usuario' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
