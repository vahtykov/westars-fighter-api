import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../infrastructure/external-services/s3.service';
import { FileRepository } from 'src/core/repositories/file.repository';
import { User } from 'src/core/domain/entities/user.entity';
import { UserDecorator } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FileUploadController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly fileRepository: FileRepository
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('bucketName') bucketName: string,
    @UserDecorator() user: User
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!bucketName) {
      throw new BadRequestException('Bucket name is required');
    }

    try {
      const { url, key, size } = await this.s3Service.uploadFile(file.buffer, file.originalname, bucketName);
      
      const fileEntity = await this.fileRepository.create({
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: size,
        bucketName: bucketName,
        key: key,
        url: url,
        user: user
      });

      return { 
        id: fileEntity.id,
        url: fileEntity.url,
        originalName: fileEntity.originalName,
        size: fileEntity.size
      };
    } catch (error) {
      throw new BadRequestException('File upload failed');
    }
  }
}