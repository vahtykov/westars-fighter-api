import { TrainingTaskCategory } from '../domain/entities/training-task-category.entity';

export interface ITrainingTaskCategoryRepository {
  findAll(): Promise<TrainingTaskCategory[]>;
  findById(id: number): Promise<TrainingTaskCategory | null>;
}
