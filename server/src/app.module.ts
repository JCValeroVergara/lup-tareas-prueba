import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { CommonModule } from './common/common.module';
import { TaskModule } from './task/task.module';


@Module({
    imports: [
        ConfigModule.forRoot(),

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
        }),

        AuthUsersModule,

        CommonModule,

        TaskModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
