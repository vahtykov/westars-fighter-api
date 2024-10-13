import { TrainingLevel } from '../domain/entities/training-level.entity';

export interface ITrainingLevelRepository {
  findAll(): Promise<TrainingLevel[]>;
}