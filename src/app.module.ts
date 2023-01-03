import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { S3Module } from './providers/s3/s3.module';

const imports = [AuthModule, PrismaModule, S3Module, UserModule];
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
export class AppModule {}

