import { BadRequestException, Injectable } from '@nestjs/common';
import { USER_NOT_FOUND } from 'src/errors/errors.constant';
import { PrismaService } from 'src/providers/prisma/prisma.service';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async get(id: number) {
        const user = await this.prisma.user
            .findUniqueOrThrow({
                where: { id },
            })
            .catch((error) => {
                throw new BadRequestException(USER_NOT_FOUND);
            });

        return user;
    }
}
