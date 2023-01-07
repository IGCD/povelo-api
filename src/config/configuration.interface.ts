export interface Configuration {
    host: string;
    port: string;
    salt: string;
    s3: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
    };
    security: {
        jwt: {
            accessSecret: string;
            accessExpiry: string;
            refreshSecret: string;
            refreshExpiry: string;
        };
    };
}
