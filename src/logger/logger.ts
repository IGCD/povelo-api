import { Logger } from '@nestjs/common';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, prettyPrint } = winston.format;
const logDir = `logs`;
const axiosLogDir = `logs/axios`;
const queryLogDir = `logs/query`;
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const dailyOptions = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), label({ label: 'povelo' }), logFormat, prettyPrint());

export const logger = winston.createLogger({
    format: dailyOptions,
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/all',
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/exception',
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

export const axiosLogger = winston.createLogger({
    format: dailyOptions,
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: axiosLogDir + '/all',
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: axiosLogDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: axiosLogDir + '/slow',
            filename: `%DATE%.slow.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: axiosLogDir + '/exception',
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

export const queryLogger = winston.createLogger({
    format: dailyOptions,
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: queryLogDir + '/all',
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: queryLogDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: queryLogDir + '/slow',
            filename: `%DATE%.slow.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: queryLogDir + '/exception',
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

export class LoggerLibrary extends Logger {
    log(message: string) {
        logger.info(message);
    }
    error(message: string) {
        logger.error(message);
    }
    warn(message: string) {
        logger.warn(message);
    }
    queryLog(message: string) {
        queryLogger.info(message);
    }
    querySlow(message: string) {
        queryLogger.warn(message);
    }
    queryError(message: string) {
        queryLogger.error(message);
    }
    axiosLog(message: string) {
        queryLogger.info(message);
    }
    axiosError(message: string) {
        queryLogger.error(message);
    }
    axiosSlow(message: string) {
        queryLogger.warn(message);
    }
}
