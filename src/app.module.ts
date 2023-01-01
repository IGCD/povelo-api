import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './providers/prisma/prisma.module';

const imports = [AuthModule, PrismaModule];
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        ...imports,
    ],
})
export class AppModule {}

