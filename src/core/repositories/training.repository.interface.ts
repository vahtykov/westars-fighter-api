import { Training } from '../domain/entities/training.entity';

export interface ITrainingRepository {
  findAll(cursor?: string, limit?: number, isBackward?: boolean, levelId?: number): Promise<Training[]>;
  findById(id: number): Promise<Training | null>;
  create(trainingData: Partial<Training>): Promise<Training>;
  update(id: number, trainingData: Partial<Training>): Promise<Training>;
  delete(id: number): Promise<void>;
  isFirstBatch(createdAt: Date, id: number): Promise<boolean>;
  isLastBatch(createdAt: Date, id: number): Promise<boolean>;
}
