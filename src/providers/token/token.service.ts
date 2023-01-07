import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Configuration } from 'src/config/configuration.interface';
import { INVALID_TOKEN } from 'src/errors/errors.constant';
import { JwtPayload } from 'src/modules/auth/auth.interface';

@Injectable()
export class TokenService {
    private config = this.configService.get<Configuration['security']['jwt']>('security.jwt');
    constructor(private configService: ConfigService, private jwtService: JwtService) {}

    signJwt(payload: JwtPayload, expiresIn: string) {
        return this.jwtService.sign(payload, {
            secret: this.config?.accessSecret,
            expiresIn,
        });
    }

    verify(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: this.config?.accessSecret,
            });
        } catch (error) {
            throw new UnauthorizedException(INVALID_TOKEN);
        }
    }

    decode(token: string) {
        return this.jwtService.decode(token);
    }
}
