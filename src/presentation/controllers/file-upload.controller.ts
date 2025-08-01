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
  },
  'task_category': {
    path: 'tasks/category/previews',
    userDependent: false
  },
  'task_video': {
    path: 'tasks/videos',
    userDependent: false
  },
  'meal_preview': {
    path: 'meals/previews',
    userDependent: false
  },
  'gym_preview': {
    path: 'gyms/previews',
    userDependent: false
  },
  'equipment_preview': {
    path: 'equipments/previews',
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
    @UploadedFile() file: any,
    @Body('bucketName') bucketName: string,
    @Body('mediaPathType') mediaPathType: string,
    @UserDecorator() user: User,
    @Body('originalName') originalName?: string,
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
      const fileOriginalName = originalName ? decodeURIComponent(originalName) : file.originalname;
      
      const pathTypeSetting = mediaPathTypes[mediaPathType];
      const filePath = pathTypeSetting.userDependent
        ? `${pathTypeSetting.path}/${user.id}/${Date.now()}-${fileOriginalName}`
        : `${pathTypeSetting.path}/${Date.now()}-${fileOriginalName}`;

      const { url, key, size } = await this.s3Service.uploadFile(file.buffer, filePath, bucketName);
      
      const fileEntity = await this.fileRepository.create({
        originalName: fileOriginalName,
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
        size: fileEntity.size,
        key: fileEntity.key,
        bucketName: fileEntity.bucketName,
        mimeType: fileEntity.mimeType,
        uploadedAt: fileEntity.uploadedAt,
      };
    } catch (error) {
      throw new BadRequestException('File upload failed', error);
    }
  }
}