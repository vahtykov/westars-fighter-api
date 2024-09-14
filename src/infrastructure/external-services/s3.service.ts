import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFile(file: Buffer, fileName: string, bucketName: string): Promise<string> {
    const minifiedFile = await this.minifyImage(file);

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucketName,
        Key: fileName,
        Body: minifiedFile,
        ContentType: this.getContentType(fileName),
      },
    });

    await upload.done();

    return `https://${bucketName}.s3.timeweb.cloud/${fileName}`;
  }

  private async minifyImage(file: Buffer): Promise<Buffer> {
    const minifiedBuffer = await imagemin.buffer(file, {
      plugins: [
        imageminMozjpeg({ quality: 75 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ],
    });

    return minifiedBuffer;
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
}