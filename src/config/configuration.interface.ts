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
            secret: string;
            accessExpiry: string;
            refreshExpiry: string;
        };
    };
}
