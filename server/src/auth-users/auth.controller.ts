import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto';
import { LoginUserDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Error al crear usuario' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    create(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Usuario logueado exitosamente' })
    @ApiResponse({ status: 400, description: 'Error al loguear usuario' })
    @ApiResponse({ status: 401, description: 'Unauthorized, Credenciales invalidas' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
        
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}
