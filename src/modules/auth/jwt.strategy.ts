import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { request, Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TOKEN_FAILED } from 'src/errors/errors.constant';
import { IJwtPayload } from './jwt-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => this.cookieExtractor(req)]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.accessKey'),
        });
    }

    async validate(payload: IJwtPayload): Promise<any> {
        return { email: payload.email };
    }

    cookieExtractor(req: Request): string {
        const cookie = req.headers.cookie;
        if (cookie) {
            const accessToken = cookie.split('=')[1];
            return accessToken;
        } else throw new UnauthorizedException(TOKEN_FAILED);
    }
}
