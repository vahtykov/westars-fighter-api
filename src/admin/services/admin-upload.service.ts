import { Injectable } from '@nestjs/common';
import { S3Service } from '../../infrastructure/external-services/s3.service';
import { FileRepository } from '../../core/repositories/file.repository';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class AdminUploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly fileRepository: FileRepository,
  ) {}

  async uploadFile(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    mediaPathType: string,
    bucketName: string,
    user: User
  ) {
    const filePath = `${mediaPathType}/${Date.now()}-${originalName}`;
    
    const { url, key, size } = await this.s3Service.uploadFile(
      buffer,
      filePath,
      bucketName
    );

    const fileEntity = await this.fileRepository.create({
      originalName,
      mimeType,
      size,
      bucketName,
      key,
      url,
      user
    });

    return fileEntity;
  }
}