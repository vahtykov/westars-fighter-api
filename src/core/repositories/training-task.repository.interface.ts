import { TrainingTask } from '../domain/entities/training-task.entity';

export interface ITrainingTaskRepository {
  findAll(): Promise<TrainingTask[]>;
  findById(id: number): Promise<TrainingTask | null>;
  findByCategoryId(categoryId: number): Promise<TrainingTask[]>;
  create(taskData: Partial<TrainingTask>): Promise<TrainingTask>;
  update(id: number, taskData: Partial<TrainingTask>): Promise<TrainingTask>;
  delete(id: number): Promise<void>;
}