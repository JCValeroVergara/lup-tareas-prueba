import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, IsObject } from 'class-validator';
import { Task } from 'src/task/entities';

export class CreateUserDto {


    @ApiProperty({ required: true, description: 'Email del usuario', uniqueItems: true })
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty({ required: true, description: 'Contraseña del usuario' })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número o un caracter especial',
    })
    password: string;
    
    @ApiProperty({ required: true, description: 'Nombre del usuario' })
    @IsString()
    @MinLength(3)
    name: string;
    
    @ApiProperty({ required: true, description: 'Estado del usuario' })
    @IsBoolean()
    @IsOptional()
    active?: boolean;

    // @ApiProperty({ required: false, description: 'Tareas del usuario' })
    // @IsOptional()
    // @IsObject()
    // tasks?: Task[];

}
