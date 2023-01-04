import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Configuration } from 'src/config/configuration.interface';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.cookies.refreshToken]),
            ignoreExpiration: false,
            secretOrKey: configService.get<Configuration['jwt']>('jwt')?.accessKey,
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        return { id: payload.id };
    }
}
