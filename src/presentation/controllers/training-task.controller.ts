import { Controller, Get, Post, Param, Body, UseGuards, HttpCode, HttpStatus, NotFoundException, InternalServerErrorException, BadRequestException, Request, UnauthorizedException } from '@nestjs/common';
import { TrainingTaskService } from '../../application/services/training-task.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('training-tasks')
@UseGuards(JwtAuthGuard)
export class TrainingTaskController {
  constructor(private trainingTaskService: TrainingTaskService) {}

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  async getCategories(@Request() req): Promise<Object> {
    try {
      const userId = req.user.id;
      const categories = await this.trainingTaskService.getCategories(userId);
      
      return {
        title: 'Категории тренировок',
        categories
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An error occurred while fetching categories');
    }
  }

  @Get('category/:id')
  @HttpCode(HttpStatus.OK)
  async getTasksByCategory(@Param('id') categoryId: number): Promise<Object> {
    try {
      const tasks = await this.trainingTaskService.getTasksByCategory(categoryId);
      const category = await this.trainingTaskService.getCategoryById(categoryId);
      
      return {
        title: category.name,
        tasks
      };
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while fetching tasks');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTaskById(@Request() req, @Param('id') id: string): Promise<Object> {
    try {
      const userId = req.user.id;
      
      if (!id || isNaN(Number(id))) {
        throw new BadRequestException('Valid task ID is required');
      }
      
      const task = await this.trainingTaskService.getTaskById(Number(id));
      const history = await this.trainingTaskService.getTrainingHistory(userId, Number(id));
      
      return {
        ...task,
        history
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while fetching the task');
    }
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  async startTraining(@Request() req, @Param('id') taskId: number): Promise<Object> {
    try {
      const userId = req.user.id;
      return await this.trainingTaskService.startTraining(userId, taskId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while starting the training');
    }
  }

  @Post('running/:id/end')
  @HttpCode(HttpStatus.OK)
  async endTraining(@Request() req, @Param('id') runningId: number): Promise<Object> {
    try {
      const userId = req.user.id;
      return await this.trainingTaskService.endTraining(userId, runningId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while ending the training');
    }
  }

  @Get(':id/running/history')
  @HttpCode(HttpStatus.OK)
  async getTrainingHistory(@Request() req, @Param('id') taskId: string): Promise<Object> {
    try {
      const userId = req.user.id;

      if (!userId) {
        throw new UnauthorizedException('User not found');
      }

      if (!taskId || isNaN(Number(taskId))) {
        throw new BadRequestException('Valid task ID is required');
      }
      
      const history = await this.trainingTaskService.getTrainingHistory(userId, Number(taskId));
      
      return {
        title: 'История тренировок',
        history
      };
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while fetching training history');
    }
  }
}
