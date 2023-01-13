import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerLibrary } from 'src/library/logger.library';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private logger = new LoggerLibrary();
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;
        const errorObj = {
            status,
            message,
            error: exception.getResponse(),
        };
        console.log('exception===>', exception);
        this.logger.error(JSON.stringify(exception.getResponse()));

        response.status(status).json({
            status,
            message,
        });
    }
}
