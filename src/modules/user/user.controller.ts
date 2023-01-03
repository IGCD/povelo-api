import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
    @Get('dd')
    async test() {
        return 'ss';
    }
}
