import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from './infrastructure/auth/jwt-refresh.strategy';

import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import { JwtAuthService } from './infrastructure/auth/jwt.service';
import { UserRepository } from './core/repositories/user.repository';
import { User } from './core/domain/entities/user.entity';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { FileUploadController } from './presentation/controllers/file-upload.controller';
import { S3Service } from './infrastructure/external-services/s3.service';
import { FileRepository } from './core/repositories/file.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, File],
        synchronize: configService.get('NODE_ENV') !== 'development' ? false : configService.get('DEV_SYNC_MODELS'), // set to false in production
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, File]),
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
