import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    /**
     *
     * We don't bother with onModuleDestroy, since Prisma has its own shutdown hooks where it will destroy the connection
     * Prisma interferes with NestJS enableShutdownHooks.
     * Prisma listens for shutdown signals and will call process.exit() before your application shutdown hooks fire.
     * To deal with this, you would need to add a listener for Prisma beforeExit event.
     * @docs : https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
     */
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
