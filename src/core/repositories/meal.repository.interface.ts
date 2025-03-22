import { Meal } from '../domain/entities/meal.entity';

export interface IMealRepository {
  findAll(): Promise<Meal[]>;
  findById(id: number): Promise<Meal | null>;
  findByCategory(categoryId: number): Promise<Meal[]>;
}
