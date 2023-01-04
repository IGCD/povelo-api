import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { USER_NOT_FOUND } from 'src/errors/errors.constant';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async get(id: number) {
        return await this.prisma.user
            .findUniqueOrThrow({
                where: { id },
            })
            .catch(() => {
                throw new BadRequestException(USER_NOT_FOUND);
            });
    }
}
