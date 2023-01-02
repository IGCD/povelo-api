import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AWSError, S3 } from 'aws-sdk';
import { Configuration } from 'src/config/configuration.interface';

@Injectable()
export class S3Service {
    s3?: S3;
    constructor(private configService: ConfigService) {
        const config = this.configService.get<Configuration['s3']>('s3');
        this.s3 = new S3({
            accessKeyId: config!.accessKeyId,
            secretAccessKey: config!.secretAccessKey,
            region: config!.region,
        });
    }

    upload(name: string, body: Buffer, bucket?: string): Promise<S3.ManagedUpload.SendData> {
        return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
            this.s3!.upload(
                {
                    Bucket: bucket ?? '',
                    Key: name,
                    Body: body,
                },
                (error: AWSError | Error, data: S3.ManagedUpload.SendData) => {
                    if (error) return reject(error);
                    resolve(data);
                },
            );
        });
    }

    get(bucket: string, name: string): Promise<S3.GetObjectOutput> {
        return new Promise((resolve, reject) => {
            this.s3?.getObject(
                {
                    Bucket: bucket,
                    Key: name,
                },
                (error: AWSError, data: S3.Types.GetObjectOutput) => {
                    if (error) return reject(error);
                    resolve(data);
                },
            );
        });
    }
}
