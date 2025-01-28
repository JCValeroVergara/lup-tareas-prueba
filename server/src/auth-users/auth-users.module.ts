import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { AuthUsersController } from './auth-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
    controllers: [AuthUsersController],
    providers: [AuthUsersService],
    imports: [
        TypeOrmModule.forFeature([
            User,
        ]),
    ],
})
export class AuthUsersModule {}
