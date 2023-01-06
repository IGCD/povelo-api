import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import { UNAUTHORIZED_TOKEN } from 'src/errors/errors.constant';

let config: ConfigService;
export const encrypt = (str: string): string => {
    const salt = config.get('salt');

    return crypto.createHmac('sha256', salt).update(str).digest('hex');
};

export const compare = (plain: string, hashed: string) => {
    if (encrypt(plain) === hashed) return true;

    throw new UnauthorizedException(UNAUTHORIZED_TOKEN);
};
