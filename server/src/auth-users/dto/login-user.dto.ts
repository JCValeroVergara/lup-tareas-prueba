import { ApiProperty } from '@nestjs/swagger';
import { IsEmail,  IsString, MaxLength, MinLength } from 'class-validator';


export class LoginUserDto {

    @ApiProperty({ required: true, description: 'User Password', uniqueItems: true })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @ApiProperty({ required: true, description: 'User Email' })
    @IsEmail()
    email: string;
}