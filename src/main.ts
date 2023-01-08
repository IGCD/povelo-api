import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.enableCors({
        origin: true,
        methods: ['POST', 'GET'],
        credentials: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );
    app.use(cookieParser());
    await app.listen(process.env.NODE_PORT ?? 3000);
}
bootstrap();

