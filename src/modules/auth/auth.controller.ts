import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { CookieOptions, Response } from 'express';
import { Configuration } from 'src/config/configuration.interface';
import { Expose } from 'src/providers/prisma/prisma.interface';
import { LoginDto, RegistDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken, accessOption, refreshToken, refreshOption, user } = await this.authService.login(data.email, data.password);

        res.cookie('accessToken', accessToken, accessOption);
        res.cookie('refreshToken', refreshToken, refreshOption);

        return user;
    }

    @Post('regist')
    async regist(@Body() data: RegistDto): Promise<Expose<User>> {
        return await this.authService.regist(data);
    }
}
