import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Configuration } from 'src/config/configuration.interface';
import { TokenModule } from 'src/providers/token/token.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const config = configService.get<Configuration['security']['jwt']>('security.jwt');
                return { secret: config?.accessSecret, signOptions: { expiresIn: config?.accessExpiry } };
            },
            inject: [ConfigService],
        }),
        TokenModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy, UserService],
})
export class AuthModule {}
