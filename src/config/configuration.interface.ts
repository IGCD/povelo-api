export interface Configuration {
    host: string;
    port: string;
    salt: string;
    s3: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
    };
    jwt: {
        accessKey: string;
        accessExpiration: string;
        refreshKey: string;
        refreshExpiration: string;
    };
}
