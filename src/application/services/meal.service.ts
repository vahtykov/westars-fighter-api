import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class MealService {
  constructor(
    // @Inject('ITrainingRepository')
    // private trainingRepository: ITrainingRepository,
  ) {}

  async getToday(): Promise<Object> {
    return {
      "breakfast": [
          {
              "id": 1,
              "previewUrl": "https://...",
              "name": "Чиа пудинг с матчей",
              "ccal": 140
          },
          {
              "id": 2,
              "previewUrl": "https://...",
              "name": "Каша овсяная",
              "ccal": 180
          }
      ],
      "lunch": [
          {
              "id": 1,
              "previewUrl": "https://...",
              "name": "Курица кацу с карри",
              "ccal": 140
          },
          {
              "id": 2,
              "previewUrl": "https://...",
              "name": "Борщ мясной",
              "ccal": 350
          }
      ],
      "dinner": [
          {
              "id": 1,
              "previewUrl": "https://...",
              "name": "Запечённая курица с апельсином",
              "ccal": 250
          }
      ],
      "snack": [
          {
              "id": 1,
              "previewUrl": "https://...",
              "name": "Салат со свеклой, нутом, йогурцом и фетой",
              "ccal": 200
          }
      ]
    };
  }

  async getById(id: number): Promise<Object> {
    return {
      "id": id,
      "previewUrl": "https://random.imagecdn.app/328/280",
      "name": "Чиа пудинг с матчей",
      "ccal": Math.floor(Math.random() * 999)
    };
  }
}
