import { Training } from '../domain/entities/training.entity';

export interface ITrainingRepository {
  findAll(cursor?: string, limit?: number, isBackward?: boolean): Promise<Training[]>;
  findById(id: number): Promise<Training | null>;
  getTotal(): Promise<number>;
  create(trainingData: Partial<Training>): Promise<Training>;
  update(id: number, trainingData: Partial<Training>): Promise<Training>;
  delete(id: number): Promise<void>;
}
