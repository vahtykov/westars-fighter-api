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
    // Проверяем первые байты файла для определения типа
    const fileType = await this.getFileType(file);
    
    // Если это не изображение, возвращаем оригинальный файл
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(fileType)) {
      return file;
    }

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

    return file;
  }

  private async getFileType(buffer: Buffer): Promise<string> {
    // Проверяем сигнатуры файлов по первым байтам
    if (buffer.length < 4) return 'unknown';

    // JPEG начинается с FF D8 FF
    if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
      return 'image/jpeg';
    }

    // PNG начинается с 89 50 4E 47
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      return 'image/png';
    }

    return 'unknown';
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
