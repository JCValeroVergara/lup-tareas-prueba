import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthUsersService {
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new authUser';
    }

    findAll() {
        return `This action returns all authUsers`;
    }

    findOne(id: number) {
        return `This action returns a #${id} authUser`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} authUser`;
    }

    remove(id: number) {
        return `This action removes a #${id} authUser`;
    }
}
