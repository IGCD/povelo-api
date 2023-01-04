import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import crypto from 'crypto';
import { Configuration } from 'src/config/configuration.interface';
import { LOGIN_FAILED, REGIST_FAILED, TOKEN_FAILED } from 'src/errors/errors.constant';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { RegistDto } from './auth.dto';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private configService: ConfigService, private jwtService: JwtService, private userService: UserService) {}
    private config = this.configService.get<Configuration['jwt']>('jwt');

    async login(email: string, password: string) {
        //* Validate User
        const user = await this.authValidator(email, password);

        const { accessToken, ...accessOption } = this.getCookieWithJwtAccessToken(user.id);
        const { refreshToken, ...refreshOption } = this.getCookieWithJwtRefreshToken(user.id);

        await this.setCurrentRefreshToken(refreshToken, user.id);

        return {
            accessToken,
            accessOption,
            refreshToken,
            refreshOption,
            user,
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

    async authValidator(email: string, password: string) {
        //* Check is Valid User Email
        return await this.prisma.user
            .findUniqueOrThrow({
                where: { email_password: { email, password: this.hasingPassword(password) } },
            })
            .catch((error) => {
                throw new BadRequestException(LOGIN_FAILED);
            });
    }

    getCookieWithJwtAccessToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: this.config!.accessKey,
            expiresIn: this.config!.accessExpiration + 's',
        });
        return {
            accessToken: token,
            maxAge: Number(this.config!.accessExpiration) * 1000,
            httpOnly: true,
            secure: true,
        };
    }
    getCookieWithJwtRefreshToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: this.config!.refreshKey,
            expiresIn: this.config!.refreshExpiration + 's',
        });
        return {
            refreshToken: token,
            maxAge: Number(this.config!.refreshExpiration) * 1000,
            httpOnly: true,
            secure: true,
        };
    }

    async setCurrentRefreshToken(refreshToken: string, id: number) {
        const hashedToken = await hash(refreshToken, 10);
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                refreshToken: hashedToken,
            },
        });
    }

    async matchRefreshToken(refreshToken: string, id: number) {
        const user = await this.userService.get(id);

        return await compare(refreshToken, user.refreshToken ?? '').catch((error) => {
            throw new BadRequestException(TOKEN_FAILED);
        });
    }

    async removeRefreshToken(id: number) {
        return this.prisma.user.update({
            where: { id },
            data: { refreshToken: null },
        });
    }

    hasingPassword(password: string) {
        const salt = this.configService.get('salt');

        return crypto.createHmac('sha256', salt).update(password).digest('hex');
    }
}
