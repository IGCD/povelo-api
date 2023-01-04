import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { Expose } from 'src/providers/prisma/prisma.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get(':userId')
    async get(@Param('userCode', ParseIntPipe) userId: number): Promise<Expose<User>> {
        return await this.userService.get(userId);
    }
}
