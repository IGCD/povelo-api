import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { LOGIN_FAILED, REGIST_FAILED } from 'src/errors/errors.constant';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { RegistDto } from './auth.dto';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private configService: ConfigService, private jwtService: JwtService) {}

    async login(email: string, password: string) {
        //* Validate User
        await this.userValidator(email, password).catch((error) => {
            throw new BadRequestException(LOGIN_FAILED);
        });
        const payload = { email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async regist(data: RegistDto) {
        const { email, password, phoneNumber } = data;

        return await this.prisma.user
            .create({
                data: {
                    email,
                    password: this.hasingPassword(password),
                    phoneNumber,
                },
            })
            .catch((error) => {
                throw new BadRequestException(REGIST_FAILED);
            });
    }

    async userValidator(email: string, password: string) {
        //* Check is Valid User Email
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { email_password: { email, password } },
        });

        //* Check Password is correct
        if (user.password !== this.hasingPassword(password)) throw new BadRequestException();

        return true;
    }

    hasingPassword(password: string) {
        const salt = this.configService.get('salt');

        return crypto.createHmac('sha256', salt).update(password).digest('hex');
    }
}
