import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminUploadService } from '../services/admin-upload.service';

@Controller('api/admin')
export class AdminUploadController {
  constructor(private readonly adminUploadService: AdminUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('mediaPathType') mediaPathType: string,
    @Body('bucketName') bucketName: string,
  ) {
    const fileEntity = await this.adminUploadService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      mediaPathType,
      bucketName,
      null // здесь можно передать текущего админ-пользователя
    );

    return {
      id: fileEntity.id,
      url: fileEntity.url
    };
  }
}