import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { S3Module } from './providers/s3/s3.module';

const imports = [AuthModule, PrismaModule, S3Module];
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        ...imports,
    ],
})
export class AppModule {}

