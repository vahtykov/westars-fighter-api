import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DailyMeal } from '../domain/entities/daily-meal.entity';
import { IDailyMealRepository } from './daily-meal.repository.interface';
import { MealCategory } from '../domain/entities/meal-category.entity';

@Injectable()
export class DailyMealRepository implements IDailyMealRepository {
  private dailyMealRepository: Repository<DailyMeal>;
  private categoryRepository: Repository<MealCategory>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.dailyMealRepository = this.dataSource.getRepository(DailyMeal);
    this.categoryRepository = this.dataSource.getRepository(MealCategory);
  }

  async findByDate(date: Date): Promise<DailyMeal[]> {
    return this.dailyMealRepository.find({
      where: { date },
      relations: ['meal', 'category'],
      order: { categoryId: 'ASC', sortOrder: 'ASC' }
    });
  }

  async findByDateAndCategory(date: Date, categoryId: number): Promise<DailyMeal[]> {
    return this.dailyMealRepository.find({
      where: { date, categoryId },
      relations: ['meal'],
      order: { sortOrder: 'ASC' }
    });
  }

  async getMealsForToday(): Promise<Record<string, any[]>> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyMeals = await this.dailyMealRepository.find({
      where: { date: today },
      relations: ['meal', 'category'],
      order: { categoryId: 'ASC', sortOrder: 'ASC' }
    });

    const categories = await this.categoryRepository.find();
    const result: Record<string, any[]> = {};

    // Инициализируем пустые массивы для каждой категории
    categories.forEach(category => {
      result[category.alias] = [];
    });

    // Заполняем результат
    dailyMeals.forEach(dailyMeal => {
      const categoryAlias = dailyMeal.category.alias;
      result[categoryAlias].push({
        id: dailyMeal.meal.id,
        previewUrl: dailyMeal.meal.previewUrl,
        name: dailyMeal.meal.name,
        ccal: dailyMeal.meal.ccal
      });
    });

    return result;
  }
}
