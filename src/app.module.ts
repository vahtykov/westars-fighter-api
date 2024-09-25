import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from './infrastructure/auth/jwt-refresh.strategy';

import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import { JwtAuthService } from './infrastructure/auth/jwt.service';
import { UserRepository } from './core/repositories/user.repository';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { FileUploadController } from './presentation/controllers/file-upload.controller';
import { S3Service } from './infrastructure/external-services/s3.service';
import { FileRepository } from './core/repositories/file.repository';
import { PostgresModule } from './infrastructure/database/datasource/postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '5h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, UserController, FileUploadController],
  providers: [
    AuthService,
    UserService,
    S3Service,
    FileRepository,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtAuthService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class AppModule {}
