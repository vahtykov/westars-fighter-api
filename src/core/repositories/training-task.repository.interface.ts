import { TrainingTask } from '../domain/entities/training-task.entity';

export interface ITrainingTaskRepository {
  findAll(): Promise<TrainingTask[]>;
  findById(id: number): Promise<TrainingTask | null>;
  findByCategoryId(categoryId: number): Promise<TrainingTask[]>;
}
