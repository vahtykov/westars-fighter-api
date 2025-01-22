import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      endpoint: process.env.AWS_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFile(file: Buffer, filePath: string, bucketName: string): Promise<{url: string, key: string, size: number}> {
    const minifiedFile = await this.minifyImage(file);

    const key = `${Date.now()}-${filePath}`;
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucketName,
        Key: filePath,
        Body: minifiedFile,
        ContentType: this.getContentType(filePath),
      },
    });

    await upload.done();

    return {
      url: `https://${bucketName}.${process.env.S3_HOST}/${filePath}`,
      key: key,
      size: minifiedFile.length
    };
  }

  private async minifyImage(file: Buffer): Promise<Buffer> {
    const image = sharp(file);
    const metadata = await image.metadata();

    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      return await image
        .jpeg({ quality: 75 })
        .toBuffer();
    }

    if (metadata.format === 'png') {
      return await image
        .png({ quality: 75 })
        .toBuffer();
    }

    // Если формат не поддерживается, возвращаем оригинал
    return file;
  }

  private getContentType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream';
    }
  }

  async deleteFile(bucketName: string, key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new Error('Failed to delete file from S3');
    }
  }
}
