import { ConfigFactory } from '@nestjs/config';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { Configuration } from './configuration.interface';
expand(config());

const configuration: Configuration = {
    host: process.env.NODE_HOST ?? 'localhost',
    port: process.env.NODE_PORT ?? '3000',
    salt: process.env.PASSWORD_SALT ?? '',
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
