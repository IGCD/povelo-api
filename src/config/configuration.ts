import { ConfigFactory } from '@nestjs/config';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { Configuration } from './configuration.interface';
expand(config());

const configuration: Configuration = {
    host: process.env.host ?? 'localhost',
    port: process.env.port ?? '3000',
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
