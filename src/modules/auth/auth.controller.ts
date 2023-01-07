import { Body, Controller, ParseIntPipe, Post, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { Expose } from 'src/providers/prisma/prisma.interface';
import { LoginDto, RegistDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('regist')
    async regist(@Body() data: RegistDto): Promise<Expose<User>> {
        return await this.authService.regist(data);
    }

    @Post('login')
    async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response) {
        return await this.authService.login(data.email, data.password);
    }

    @Post('logout')
    async logout(@Body('userId', ParseIntPipe) userId: number, @Res({ passthrough: true }) res: Response): Promise<{ success: true }> {
        res.clearCookie('accessToken');
        await this.authService.logout(userId);
        return { success: true };
    }
}
