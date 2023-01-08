import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Session, User } from '@prisma/client';
import { Expose } from './prisma.interface';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();

    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);

    return result;
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }

    expose<T>(item: T): Expose<T> {
        if (!item) return {} as T;

        if ((item as any as Partial<User>).password) (item as any).hasPasword = true;

        delete (item as any as Partial<User>).password;
        delete (item as any as Partial<Session>).token;
        delete (item as any as Partial<User>).phoneNumber;

        return item;
    }
}
