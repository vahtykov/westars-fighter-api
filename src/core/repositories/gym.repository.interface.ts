import { Gym } from '../domain/entities/gym.entity';

export interface IGymRepository {
  findAll(): Promise<Gym[]>;
  findById(id: number): Promise<Gym | null>;
}
