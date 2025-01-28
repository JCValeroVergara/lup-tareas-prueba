import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth-users')
export class AuthUsersController {
    constructor(private readonly authUsersService: AuthUsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.authUsersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.authUsersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authUsersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.authUsersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authUsersService.remove(+id);
    }
}
