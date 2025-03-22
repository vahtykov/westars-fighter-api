import { DailyMeal } from '../domain/entities/daily-meal.entity';

export interface IDailyMealRepository {
  findByDate(date: Date): Promise<DailyMeal[]>;
  findByDateAndCategory(date: Date, categoryId: number): Promise<DailyMeal[]>;
  getMealsForToday(): Promise<Record<string, any[]>>;
}
