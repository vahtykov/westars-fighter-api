import { DynamicModule, Module } from '@nestjs/common';
import { authenticate } from './auth';
import { Training } from '../core/domain/entities/training.entity';
import { User } from '../core/domain/entities/user.entity';
import { File } from '../core/domain/entities/file.entity';
import { TrainingLevel } from '../core/domain/entities/training-level.entity';
import { S3Service } from '../infrastructure/external-services/s3.service';
import { FileRepository } from '../core/repositories/file.repository';
import { AdminUploadService } from './services/admin-upload.service';

@Module({})
export class AdminJsModule {
  static async forRootAsync(): Promise<DynamicModule> {
    const AdminJS = (await import('adminjs')).default;
    const { Database, Resource } = await import('@adminjs/typeorm');
    const { AdminModule } = await import('@adminjs/nestjs');
    
    AdminJS.registerAdapter({ Database, Resource });

    const adminModule = await AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: Training,
              options: {
                properties: {
                  previewUrl: {
                    isVisible: { list: true, filter: false, show: true, edit: false }
                  },
                  videoUrl: {
                    isVisible: { list: true, filter: false, show: true, edit: false }
                  },
                  previewFileId: {
                    type: 'file',
                    isVisible: { list: false, filter: false, show: true, edit: true }
                  },
                  videoFileId: {
                    type: 'file',
                    isVisible: { list: false, filter: false, show: true, edit: true }
                  }
                }
              }
            },
            TrainingLevel,
            User,
            File
          ],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      }),
    });

    return {
      module: AdminJsModule,
      imports: [adminModule],
      providers: [S3Service, FileRepository, AdminUploadService],
      exports: [AdminUploadService],
    };
  }
}
