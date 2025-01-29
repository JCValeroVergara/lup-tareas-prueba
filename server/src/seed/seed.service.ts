import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { initialSeedData } from './data/seed-data';


@Injectable()
export class SeedService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    async runSeed() {
        await this.insertNewUser();
        return 'Seed ejecutado';
    }

    private async insertNewUser() {
        const users = initialSeedData.users;

        const insertPromises = [];

        users.forEach(user => {
            insertPromises.push(this.usersService.create(user));
        });

        await Promise.all(insertPromises);

        return 'Usuarios insertados';
    }
}
