import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const PORT = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Main');

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Tareas App Prueba Técnica Api')
        .setDescription('Tareas App Api')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
    logger.log(`Swagger is enabled in http://localhost:${PORT}/api-docs`);

    app.enableCors();

    await app.listen(PORT);
    logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
