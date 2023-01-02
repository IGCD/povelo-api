import { ConfigFactory } from '@nestjs/config';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { cast } from 'src/helper/cast';
import { Configuration } from './configuration.interface';
expand(config());

const configuration: Configuration = {
    host: cast('NODE_HOST', 'string', 'localhost'),
    port: cast('NODE_PORT', 'number', 3000),
    salt: cast('PASSWORD_SALT', 'string'),
    s3: {
        accessKeyId: cast('AWS_S3_ACCESS_KEY', 'string'),
        secretAccessKey: cast('AWS_S3_SECRET_KEY', 'string'),
        region: cast('AWS_S3_REGION', 'string', 'ap-northeast-2'),
    },
    jwt: {
        secretKey: cast('JWT_SECRET_KEY', 'string'),
    },
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
