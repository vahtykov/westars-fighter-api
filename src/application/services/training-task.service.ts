import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ITrainingTaskCategoryRepository } from '../../core/repositories/training-task-category.repository.interface';
import { IUserTaskCategoryRepository } from '../../core/repositories/user-task-category.repository.interface';
import { ITrainingTaskRepository } from '../../core/repositories/training-task.repository.interface';
import { ITrainingTaskRunningRepository } from '../../core/repositories/training-task-running.repository.interface';

@Injectable()
export class TrainingTaskService {
  constructor(
    @Inject('ITrainingTaskCategoryRepository')
    private categoryRepository: ITrainingTaskCategoryRepository,
    @Inject('IUserTaskCategoryRepository')
    private userCategoryRepository: IUserTaskCategoryRepository,
    @Inject('ITrainingTaskRepository')
    private taskRepository: ITrainingTaskRepository,
    @Inject('ITrainingTaskRunningRepository')
    private runningRepository: ITrainingTaskRunningRepository
  ) {}

  async getCategories(userId: string): Promise<any[]> {
    const categories = await this.categoryRepository.findAll();
    const userCategories = await this.userCategoryRepository.findByUserId(userId);
    
    const userCategoryIds = userCategories.map(uc => uc.taskCategoryId);
    
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl,
      isLocked: !userCategoryIds.includes(category.id)
    }));
  }

  async getTasksByCategory(categoryId: number): Promise<any[]> {
    const tasks = await this.taskRepository.findByCategoryId(categoryId);
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      videoUrl: task.videoUrl,
      imageUrl: task.imageUrl,
      durationMinutes: task.durationMinutes,
      categoryId: task.categoryId
    }));
  }

  async getTaskById(id: number): Promise<any> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Training task with id ${id} not found`);
    }
    
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      videoUrl: task.videoUrl,
      imageUrl: task.imageUrl,
      durationMinutes: task.durationMinutes,
      categoryId: task.categoryId,
      categoryName: task.category?.name
    };
  }

  async startTraining(userId: string, taskId: number): Promise<any> {
    // Проверяем существование задания
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundException(`Training task with id ${taskId} not found`);
    }
    
    // Создаем новую запись о запуске тренировки
    const running = await this.runningRepository.create({
      userId,
      trainingTaskId: taskId,
      startTrainingTime: new Date()
    });
    
    return {
      id: running.id,
      taskId: running.trainingTaskId,
      startTime: running.startTrainingTime
    };
  }

  async endTraining(userId: string, runningId: number): Promise<any> {
    // Находим запись о запуске тренировки
    const running = await this.runningRepository.findById(runningId);
    if (!running) {
      throw new NotFoundException(`Training running with id ${runningId} not found`);
    }
    
    // Проверяем, что запись принадлежит пользователю
    if (running.userId !== userId) {
      throw new BadRequestException('This training running does not belong to the current user');
    }
    
    // Проверяем, что тренировка еще не завершена
    if (running.endTrainingTime) {
      throw new BadRequestException('This training has already been completed');
    }
    
    // Обновляем запись, устанавливая время окончания
    const updatedRunning = await this.runningRepository.update(runningId, {
      endTrainingTime: new Date()
    });
    
    return {
      id: updatedRunning.id,
      taskId: updatedRunning.trainingTaskId,
      startTime: updatedRunning.startTrainingTime,
      endTime: updatedRunning.endTrainingTime,
      durationMinutes: Math.round((updatedRunning.endTrainingTime.getTime() - updatedRunning.startTrainingTime.getTime()) / 60000)
    };
  }
}
