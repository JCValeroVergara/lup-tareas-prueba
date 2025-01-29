import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dtos';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    private async findUserById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con Id: ${id} no encontrado`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDto) {
        
        try {
            
            const { password, ...userData } = createUserDto;

            const userExists = await this.usersRepository.findOne({ 
                where: { email: userData.email }
            });
            if (userExists) {
                throw new BadRequestException('Usuario ya existe');
            }

            const user = this.usersRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            });

            await this.usersRepository.save(user);
            delete user.password;

            return {
                ...user,
            }

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<User[]> {
        const { limit, offset } = paginationDto;

        return await this.usersRepository.find({
            skip: offset,
            take: limit,
            where: { active: true }
        });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });
        if (!user) 
            throw new NotFoundException(`Usuario con Id: ${id} no encontrado`);
        delete user.password;

        return user;
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`Usuario con email: ${email} no encontrado`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findUserById(id);

        if (updateUserDto.password) {
            updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
        }

        Object.assign(user, updateUserDto);

        await this.usersRepository.save(user);
        delete user.password;

        return user;
    }

    async remove(id: string) {
        await this.findUserById(id);

        await this.usersRepository.update(id, { active: false });
        return { message: `Usuario con Id: ${id} desactivado` };
    }
}
