import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Configuration } from 'src/config/configuration.interface';
import { EMAIL_USER_CONFLICT, INVALID_LOGIN, PHONE_USER_CONFLICT, SESSION_NOT_FOUND } from 'src/errors/errors.constant';
import { encrypt } from 'src/helper/encrypt';
import { safeEmail } from 'src/helper/safe-email';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { TokenService } from 'src/providers/token/token.service';
import { RegistDto } from './auth.dto';
import { JwtPayload } from './auth.interface';
@Injectable()
export class AuthService {
    private config = this.configService.get<Configuration['security']>('security');
    constructor(private prisma: PrismaService, private configService: ConfigService, private tokenService: TokenService) {}

    async login(email: string, password: string) {
        //* Validate User
        const user = await this.loginValidator(email, password);

        const accessToken = this.getSignedAccessToken({ userId: user.id });
        const refreshToken = this.getSignedRefreshToken({ userId: user.id });

        //* Save Refresh into Session
        await this.prisma.session.create({
            data: {
                token: refreshToken,
                user: { connect: { id: user.id } },
            },
        });

        return {
            accessToken,
            user,
        };
    }

    async regist(data: RegistDto) {
        const { email, password, phoneNumber, name } = data;
        const emailSafe = safeEmail(email);
        await this.registValidator(emailSafe, phoneNumber);

        return await this.prisma.user.create({
            data: {
                name,
                phoneNumber,
                emails: { create: { email: emailSafe, password: encrypt(password) } },
            },
        });
    }

    async logout(userId: number) {
        const session = await this.prisma.session.findFirst({
            where: { userId },
            select: { id: true, user: { select: { id: true } } },
        });
        if (!session) throw new NotFoundException(SESSION_NOT_FOUND);

        const deletion = await this.prisma.session.delete({ where: { id: session.id } });
        return { success: true };
    }

    async refresh(payload: JwtPayload) {
        const { userId } = payload;

        const session = await this.prisma.session.findFirst({ where: { userId } });
        if (!session) throw new NotFoundException(SESSION_NOT_FOUND);

        return this.getSignedAccessToken(payload);
    }

    async loginValidator(email: string, password: string) {
        const emailSafe = safeEmail(email);

        const user = await this.prisma.user.findFirst({
            where: { emails: { some: { email: emailSafe, password: encrypt(password) } } },
        });

        if (!user) throw new BadRequestException(INVALID_LOGIN);

        return this.prisma.expose<User>(user);
    }

    async registValidator(email: string, phoneNumber: string) {
        const existEmail = await this.prisma.email.findUnique({ where: { email } });
        const existPhone = await this.prisma.user.findUnique({ where: { phoneNumber } });

        if (existEmail) throw new ConflictException(EMAIL_USER_CONFLICT);
        if (existPhone) throw new ConflictException(PHONE_USER_CONFLICT);

        return;
    }

    getSignedAccessToken(payload: JwtPayload) {
        const expiresIn = this.config?.jwt.accessExpiry!;
        const token = this.tokenService.signJwt(payload, expiresIn);

        return token;
    }

    getSignedRefreshToken(payload: JwtPayload) {
        const expiresIn = this.config?.jwt.refreshExpiry!;
        const token = this.tokenService.signJwt(payload, expiresIn);

        return token;
    }
}
