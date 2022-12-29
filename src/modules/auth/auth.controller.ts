import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './auth.dto';

@Controller()
export class AuthController {
    @Post('login')
    async login(@Body() body: LoginDto) {}
}
