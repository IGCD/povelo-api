import { Body, Controller, Post } from '@nestjs/common';
import { user } from '@prisma/client';
import { Expose } from 'src/providers/prisma/prisma.interface';
import { LoginDto, RegistDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() data: LoginDto) {
        return await this.authService.login(data.email, data.password);
    }

    @Post('regist')
    async regist(@Body() data: RegistDto): Promise<Expose<user>> {
        return await this.authService.regist(data);
    }
}
