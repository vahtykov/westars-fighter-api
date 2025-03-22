import { Motivation } from '../domain/entities/motivation.entity';

export interface IMotivationRepository {
  findByDate(date: Date): Promise<Motivation | null>;
  findToday(): Promise<Motivation | null>;
}