import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerLibrary } from 'src/library/logger.library';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new LoggerLibrary();
    use(req: Request, res: Response, next: NextFunction) {
        if (req.method.includes('POST')) this.logger.log(JSON.stringify({ method: 'POST', body: req.body }));
        else if (req.method.includes('GET')) this.logger.log(JSON.stringify({ method: 'GET', params: req.params }));

        next();
    }
}
