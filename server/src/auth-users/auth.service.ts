import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt.interface';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto) {

        const user = await this.usersService.create(createUserDto);
        const token = this.getJwtToken({
            email: user.email,
            name: user.name
        });

        return {
            user,
            token
        }
    }

    async login(loginUserDto: LoginUserDto) {
        
        const { email, password } = loginUserDto;
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas');
        }
        if(!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        delete user.password;
        
        return {
            user,
            token: this.getJwtToken({
                email: user.email,
                name: user.name
            })
        }
    }

    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }
}
