import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Configuration } from 'src/config/configuration.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<Configuration['jwt']['secretKey']>('jwt.secretKey'),
        });
    }

    async validate(payload: any): Promise<any> {
        return { email: payload.email };
    }
}
