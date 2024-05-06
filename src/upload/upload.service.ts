import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: fileName,
        Body: file,
      }),
    );
  }
}
