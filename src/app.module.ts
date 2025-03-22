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
import { MealRepository } from './core/repositories/meal.repository';
import { MealCategoryRepository } from './core/repositories/meal-category.repository';
import { DailyMealRepository } from './core/repositories/daily-meal.repository';
import { MotivationRepository } from './core/repositories/motivation.repository';
import { GymRepository } from './core/repositories/gym.repository';
import { EquipmentRepository } from './core/repositories/equipment.repository';
import { TrainingTaskCategoryRepository } from './core/repositories/training-task-category.repository';
import { TrainingTaskRunningRepository } from './core/repositories/training-task-running.repository';
import { TrainingTaskRepository } from './core/repositories/training-task.repository';
import { UserTaskCategoryRepository } from './core/repositories/user-task-category.repository';
import { TrainingTaskController } from './presentation/controllers/training-task.controller';
import { TrainingTaskService } from './application/services/training-task.service';

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
    TrainingTaskController,
  ],
  providers: [
    AuthService,
    UserService,
    TrainingService,
    MealService,
    GymService,
    EquipmentService,
    MotivationService,
    TrainingTaskService,
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
    {
      provide: 'IMealRepository',
      useClass: MealRepository,
    },
    {
      provide: 'IMealCategoryRepository',
      useClass: MealCategoryRepository,
    },
    {
      provide: 'IDailyMealRepository',
      useClass: DailyMealRepository,
    },
    {
      provide: 'IMotivationRepository',
      useClass: MotivationRepository,
    },
    {
      provide: 'IGymRepository',
      useClass: GymRepository,
    },
    {
      provide: 'IEquipmentRepository',
      useClass: EquipmentRepository,
    },
    {
      provide: 'ITrainingTaskCategoryRepository',
      useClass: TrainingTaskCategoryRepository,
    },
    {
      provide: 'IUserTaskCategoryRepository',
      useClass: UserTaskCategoryRepository,
    },
    {
      provide: 'ITrainingTaskRepository',
      useClass: TrainingTaskRepository,
    },
    {
      provide: 'ITrainingTaskRunningRepository',
      useClass: TrainingTaskRunningRepository,
    },
  ],
})
export class AppModule {}
