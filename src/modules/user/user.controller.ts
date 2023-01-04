import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get(':userId')
    async get(@Param('userCode', ParseIntPipe) userId: number) {
        return await this.userService.get(userId);
    }
}
