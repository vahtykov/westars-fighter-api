import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from './infrastructure/auth/jwt-refresh.strategy';

import { AuthController } from './presentation/controllers/auth.controller';
import { AdminAuthController } from './presentation/controllers/admin-auth.controller';
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

import { TrainingController } from './presentation/controllers/training.controller';
import { TrainingService } from './application/services/training.service';
import { TrainingRepository } from './core/repositories/training.repository';
import { TrainingLevelRepository } from './core/repositories/training-level.repository';
import { MealController } from './presentation/controllers/meal.controller';
import { MealService } from './application/services/meal.service';
import { GymController } from './presentation/controllers/gym.controller';
import { GymService } from './application/services/gym.service';
import { EquipmentController } from './presentation/controllers/equipment.controller';
import { EquipmentService } from './application/services/equipment.service';
import { MotivationService } from './application/services/motivation.service';
import { MotivationController } from './presentation/controllers/motivation.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: '360d'
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthController,
    AdminAuthController,
    UserController,
    FileUploadController,
    TrainingController,
    MealController,
    GymController,
    EquipmentController,
    MotivationController,
  ],
  providers: [
    AuthService,
    UserService,
    TrainingService,
    MealService,
    GymService,
    EquipmentService,
    MotivationService,
    S3Service,
    FileRepository,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtAuthService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ITrainingRepository',
      useClass: TrainingRepository,
    },
    {
      provide: 'ITrainingLevelRepository',
      useClass: TrainingLevelRepository,
    },
  ],
})
export class AppModule {}
