import { Module, DynamicModule, Inject } from '@nestjs/common';
import { Training } from '../core/domain/entities/training.entity';
import { User } from '../core/domain/entities/user.entity';
import { TrainingLevel } from '../core/domain/entities/training-level.entity';
import { File } from '../core/domain/entities/file.entity';
import { DataSource } from 'typeorm';

const dynamicImport = async (packageName: string) => {
  return new Function(`return import('${packageName}')`)();
};

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({})
export class AdminPanelModule {
  static async forRootAsync(): Promise<DynamicModule> {
    return {
      module: AdminPanelModule,
      imports: [],
      providers: [
        {
          provide: 'ADMIN_JS',
          useFactory: async (dataSource: DataSource) => {
            // Проверяем, что соединение активно
            if (!dataSource.isInitialized) {
              throw new Error('Database connection is not initialized');
            }
            
            const { default: AdminJS } = await dynamicImport('adminjs');
            const { AdminModule } = await dynamicImport('@adminjs/nestjs');
            const { Database, Resource } = await dynamicImport('@adminjs/typeorm');
            const { ComponentLoader } = await dynamicImport('adminjs');

            AdminJS.registerAdapter({ Database, Resource });

            const componentLoader = new ComponentLoader();

            return AdminModule.createAdminAsync({
              useFactory: () => ({
                adminJsOptions: {
                  rootPath: '/admin',
                  resources: [
                    {
                      resource: Training,
                      options: {
                        properties: {
                          previewUrl: {
                            isVisible: { list: true, show: true, edit: true },
                            components: {
                              edit: componentLoader.add('UploadFile', './components/upload-file.component'),
                            },
                          },
                          videoUrl: {
                            isVisible: { list: true, show: true, edit: true },
                            components: {
                              edit: componentLoader.add('UploadVideo', './components/upload-file.component'),
                            },
                          },
                        },
                      },
                    },
                    {
                      resource: User,
                      options: {
                        properties: {
                          password: {
                            isVisible: { list: false, edit: true, show: false },
                            type: 'password',
                          },
                          refreshToken: {
                            isVisible: false,
                          },
                        },
                      },
                    },
                    { resource: TrainingLevel },
                    { resource: File },
                  ],
                  componentLoader,
                  branding: {
                    companyName: 'Моя Админка',
                    logo: false,
                    softwareBrothers: false,
                  },
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
          },
          inject: [DataSource],
        },
      ],
      exports: ['ADMIN_JS'],
    };
  }
}