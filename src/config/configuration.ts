import { ConfigFactory } from '@nestjs/config';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { Configuration } from './configuration.interface';
expand(config());

const configuration: Configuration = {
    host: process.env.NODE_HOST ?? 'localhost',
    port: process.env.NODE_PORT ?? '3000',
    salt: process.env.PASSWORD_SALT ?? '',
    s3: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_S3_SECRET_KEY ?? '',
        region: process.env.AWS_S3_REGION ?? '',
    },
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
