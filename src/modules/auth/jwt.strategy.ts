import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Configuration } from 'src/config/configuration.interface';
import { TokenService } from 'src/providers/token/token.service';
import { JwtPayload } from './auth.interface';
import { AuthService } from './auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private tokenService: TokenService, private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies.accessToken]),
            ignoreExpiration: false,
            secretOrKey: configService.get<Configuration['security']['jwt']['secret']>('security.jwt.secret'),
            passReqToCallback: true,
        });
    }

    async validate(request: Request): Promise<any> {
        const token = request.cookies['accessToken'];
        try {
            return this.tokenService.verify(token);
        } catch (error) {
            await this.authService.refresh(token);
        }
    }
}
