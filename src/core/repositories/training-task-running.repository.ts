import { Inject, Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';
import { TrainingTaskRunning } from '../domain/entities/training-task-running.entity';
import { ITrainingTaskRunningRepository } from './training-task-running.repository.interface';

@Injectable()
export class TrainingTaskRunningRepository implements ITrainingTaskRunningRepository {
  private runningRepository: Repository<TrainingTaskRunning>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.runningRepository = this.dataSource.getRepository(TrainingTaskRunning);
  }

  async findById(id: number): Promise<TrainingTaskRunning | null> {
    return this.runningRepository.findOne({
      where: { id },
      relations: ['task', 'user']
    });
  }

  async findByUserAndTask(userId: string, taskId: number): Promise<TrainingTaskRunning[]> {
    return this.runningRepository.find({
      where: { userId, trainingTaskId: taskId },
      order: { startTrainingTime: 'DESC' },
      take: 20,
    });
  }

  async findActiveByUserAndTask(userId: string, taskId: number): Promise<TrainingTaskRunning | null> {
    return this.runningRepository.findOne({
      where: {
        userId,
        trainingTaskId: taskId,
        endTrainingTime: IsNull()
      }
    });
  }

  async create(data: Partial<TrainingTaskRunning>): Promise<TrainingTaskRunning> {
    const running = this.runningRepository.create(data);
    return this.runningRepository.save(running);
  }

  async update(id: number, data: Partial<TrainingTaskRunning>): Promise<TrainingTaskRunning> {
    await this.runningRepository.update(id, data);
    return this.findById(id);
  }
}
