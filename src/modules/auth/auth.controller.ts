import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() data: LoginDto) {
        return await this.authService.login(data.email, data.password);
    }
}
