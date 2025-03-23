import { TrainingTaskRunning } from '../domain/entities/training-task-running.entity';

export interface ITrainingTaskRunningRepository {
  findById(id: number): Promise<TrainingTaskRunning | null>;
  findByUserAndTask(userId: string, taskId: number): Promise<TrainingTaskRunning[]>;
  findActiveByUserAndTask(userId: string, taskId: number): Promise<TrainingTaskRunning | null>;
  create(data: Partial<TrainingTaskRunning>): Promise<TrainingTaskRunning>;
  update(id: number, data: Partial<TrainingTaskRunning>): Promise<TrainingTaskRunning>;
}