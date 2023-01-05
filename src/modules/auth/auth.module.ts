import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Configuration } from 'src/config/configuration.interface';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<Configuration['jwt']['accessKey']>('jwt.accessKey'),
                signOptions: {
                    expiresIn: configService.get<Configuration['jwt']['accessExpiration']>('jwt.accessExpiration'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy, JwtRefreshStrategy, UserService],
})
export class AuthModule {}
