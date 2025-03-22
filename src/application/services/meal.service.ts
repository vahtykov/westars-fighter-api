import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IDailyMealRepository } from '../../core/repositories/daily-meal.repository.interface';
import { IMealRepository } from '../../core/repositories/meal.repository.interface';

@Injectable()
export class MealService {
  constructor(
    @Inject('IDailyMealRepository')
    private dailyMealRepository: IDailyMealRepository,
    @Inject('IMealRepository')
    private mealRepository: IMealRepository
  ) {}

  async getToday(): Promise<Object> {
    try {
      return await this.dailyMealRepository.getMealsForToday();
    } catch (error) {
      // Если данных на сегодня нет или произошла ошибка, возвращаем моковые данные
      return {
        "breakfast": [
            {
                "id": 1,
                "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/meals/image-min.png",
                "name": "Чиа пудинг с матчей",
                "ccal": 140
            },
            {
                "id": 2,
                "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/meals/image 106-min.png",
                "name": "Каша овсяная",
                "ccal": 180
            }
        ],
        "lunch": [
            {
                "id": 1,
                "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/meals/image (1)-min.png",
                "name": "Курица кацу с карри",
                "ccal": 140
            },
            {
                "id": 2,
                "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/meals/image 108-min.png",
                "name": "Борщ мясной",
                "ccal": 350
            }
        ],
        "dinner": [
            {
                "id": 1,
                "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/meals/image-min.png",
                "name": "Запечённая курица с апельсином",
                "ccal": 250
            }
        ],
        "snack": [
            {
                "id": 1,
                "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/meals/image 106-min.png",
                "name": "Салат со свеклой, нутом, йогурцом и фетой",
                "ccal": 200
            }
        ]
      };
    }
  }

  async getById(id: number): Promise<Object> {
    const meal = await this.mealRepository.findById(id);
    if (!meal) {
      throw new NotFoundException(`Meal with id ${id} not found`);
    }
    
    return {
      id: meal.id,
      previewUrl: meal.previewUrl,
      name: meal.name,
      ccal: meal.ccal,
      description: meal.description,
      proteins: meal.proteins,
      fats: meal.fats,
      carbs: meal.carbs
    };
  }
}
