import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient, Session, User } from '@prisma/client';
import { LoggerLibrary } from 'src/library/logger.library';
import { Expose } from './prisma.interface';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> implements OnModuleInit {
    private readonly logger = new LoggerLibrary();

    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'error' },
            ],
        });
    }
    async onModuleInit() {
        this.$on('query', (e: Prisma.QueryEvent) => {
            const format = `QUERY: ${e.query} || PARAMS: ${e.params} || DURATION: ${e.duration}`;
            this.logger.queryLog(format);

            //* For slow query, 2 seconds over
            if (e.duration > 2000) this.logger.querySlow(format);
        });
        this.$on('error', (e: Prisma.LogEvent) => {
            this.logger.queryError(`${e.message}`);
        });

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
