import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TrainingTask } from '../domain/entities/training-task.entity';
import { ITrainingTaskRepository } from './training-task.repository.interface';

@Injectable()
export class TrainingTaskRepository implements ITrainingTaskRepository {
  private taskRepository: Repository<TrainingTask>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.taskRepository = this.dataSource.getRepository(TrainingTask);
  }

  async findAll(): Promise<TrainingTask[]> {
    return this.taskRepository.find();
  }

  async findById(id: number): Promise<TrainingTask | null> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['category']
    });
  }

  async findByCategoryId(categoryId: number): Promise<TrainingTask[]> {
    return this.taskRepository.find({
      where: { categoryId },
      relations: ['category']
    });
  }

  async create(taskData: Partial<TrainingTask>): Promise<TrainingTask> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  async update(id: number, taskData: Partial<TrainingTask>): Promise<TrainingTask> {
    await this.taskRepository.update(id, taskData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}