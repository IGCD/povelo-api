import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CookieOptions } from 'express';
import { Configuration } from 'src/config/configuration.interface';
import { BAD_REQEUST_REGIST, BAD_REQUEST_LOGIN } from 'src/errors/errors.constant';
import { compare, encrypt } from 'src/helper/encrypt';
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
        const { accessToken, accessOption } = this.getCookieWithJwtAccessToken(user.id);
        const { refreshToken, refreshOption } = this.getCookieWithJwtRefreshToken(user.id);

        this.setCurrentRefreshToken(refreshToken, user.id);

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
                    password: encrypt(password),
                    phoneNumber,
                },
            })
            .catch((error) => {
                throw new BadRequestException(BAD_REQEUST_REGIST);
            });
    }

    async authValidator(email: string, password: string) {
        //* Check is Valid User Email
        const user = await this.prisma.user
            .findUniqueOrThrow({
                where: { email_password: { email, password: encrypt(password) } },
            })
            .catch((error) => {
                throw new BadRequestException(BAD_REQUEST_LOGIN);
            });
        return this.prisma.expose<User>(user);
    }

    getCookieWithJwtAccessToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: this.config!.accessKey,
            expiresIn: this.config!.accessExpiration,
        });

        const accessOption: CookieOptions = {
            maxAge: parseInt(this.config!.accessExpiration) * 60 * 1000,
            httpOnly: true,
            secure: true,
        };
        return {
            accessToken: token,
            accessOption,
        };
    }
    getCookieWithJwtRefreshToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: this.config!.refreshKey,
            expiresIn: this.config!.refreshExpiration,
        });

        const refreshOption: CookieOptions = {
            maxAge: parseInt(this.config!.refreshExpiration) * 60 * 1000,
            httpOnly: true,
            secure: true,
        };

        return {
            refreshToken: token,
            refreshOption,
        };
    }

    async setCurrentRefreshToken(rT: string, id: number) {
        const { refreshToken } = await this.prisma.user.update({
            where: { id },
            data: { refreshToken: encrypt(rT) },
        });

        return refreshToken;
    }

    async matchRefreshToken(token: string, id: number) {
        const user = await this.userService.get(id);
        compare(token, user.refreshToken ?? '');
        return this.prisma.expose<User>(user);
    }

    async removeRefreshToken(id: number) {
        return this.prisma.user.update({
            where: { id },
            data: { refreshToken: null },
        });
    }
}
