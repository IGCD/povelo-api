export interface Configuration {
    host: string;
    port: string;

    s3: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
    };
    security: {
        salt: string;
        jwt: {
            secret: string;
            accessExpiry: string;
            refreshExpiry: string;
        };
    };
}
