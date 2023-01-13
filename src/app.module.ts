import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt.guard';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { S3Module } from './providers/s3/s3.module';
import { TokenModule } from './providers/token/token.module';

const imports = [AuthModule, PrismaModule, S3Module, UserModule, TokenModule];
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        ...imports,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}

