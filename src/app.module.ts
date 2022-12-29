import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';

const imports = [AuthModule];
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        ...imports,
    ],
})
export class AppModule {}

