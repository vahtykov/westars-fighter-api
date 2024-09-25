import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../../infrastructure/external-services/s3.service';
import { FileRepository } from 'src/core/repositories/file.repository';
import { User } from 'src/core/domain/entities/user.entity';
import { UserDecorator } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

// TODO: вынести в настройки БД
const mediaPathTypes: Record<string, { path: string, userDependent: boolean }> = {
  'avatar': {
    path: 'avatars',
    userDependent: true // the path is different for each user
  },
  'training_preview': {
    path: 'trainings/previews',
    userDependent: false // the path is the same for all users
  },
  'training_video': {
    path: 'trainings/videos',
    userDependent: false
  },
  'task_preview': {
    path: 'tasks/previews',
    userDependent: false
  }
};

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
    @Body('mediaPathType') mediaPathType: string,
    @UserDecorator() user: User
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!bucketName) {
      throw new BadRequestException('Bucket name is required');
    }

    if (!mediaPathType) {
      throw new BadRequestException('Media path type is required');
    }

    try {
      const pathTypeSetting = mediaPathTypes[mediaPathType];
      const filePath = pathTypeSetting.userDependent
        ? `${pathTypeSetting.path}/${user.id}/${Date.now()}-${file.originalname}`
        : `${pathTypeSetting.path}/${Date.now()}-${file.originalname}`;

      const { url, key, size } = await this.s3Service.uploadFile(file.buffer, filePath, bucketName);
      
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