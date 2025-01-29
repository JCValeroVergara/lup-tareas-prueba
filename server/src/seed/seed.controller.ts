import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}


    @Get()
    @ApiResponse({ status: 200, description: 'Seed ejecutado' })
    @ApiResponse({ status: 500, description: 'Error en el servidor' })
    executeSeed() {
        return this.seedService.runSeed();
    }

}
