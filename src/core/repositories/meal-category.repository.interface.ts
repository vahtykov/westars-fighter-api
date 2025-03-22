import { MealCategory } from '../domain/entities/meal-category.entity';

export interface IMealCategoryRepository {
  findAll(): Promise<MealCategory[]>;
  findById(id: number): Promise<MealCategory | null>;
  findByAlias(alias: string): Promise<MealCategory | null>;
}
