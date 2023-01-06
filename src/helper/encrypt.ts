import { UnauthorizedException } from '@nestjs/common';
import crypto from 'crypto';
import { UNAUTHORIZED_TOKEN } from 'src/errors/errors.constant';

export const encrypt = (str: string): string => {
    const salt = process.env.SALT ?? '';

    return crypto.createHmac('sha256', salt).update(str).digest('hex');
};

export const compare = (plain: string, hashed: string) => {
    if (encrypt(plain) === hashed) return true;

    throw new UnauthorizedException(UNAUTHORIZED_TOKEN);
};
