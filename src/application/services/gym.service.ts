import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class GymService {
  constructor(
    // @Inject('ITrainingRepository')
    // private trainingRepository: ITrainingRepository,
  ) {}

  async getList(): Promise<Object> {
    return [
          {
              "id": 1,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/1-min.png",
              "name": "Автозаводская школа бокса",
              "address": "г. Нижний Новгород, Автозаводский район, ул. Краснодонцев 10"
          },
          {
              "id": 2,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/2-min.png",
              "name": "Боксерский клуб «КАДЕТ»",
              "address": "г. Нижний Новгород, Ленинский район, ул. Сухопутная 2"
          },
          {
              "id": 3,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/3-min.png",
              "name": "ЦСР «Территория спорта»",
              "address": "г. Нижний Новгород, ул. Глеба Успенского 16а. 2-й этаж"
          },
          {
              "id": 4,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/4-min.png",
              "name": "МБУ СШ Дворец Спорта «Заречье»",
              "address": "г. Нижний Новгород, Ленинский район, ул. Арктическая, 7"
          },
          {
              "id": 5,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/5-min.png",
              "name": "Сормовская школа бокса",
              "address": "г. Нижний Новгород, Сормовский район, ул. 50 лет победы, 12"
          },
          {
              "id": 6,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/6-min.png",
              "name": "Боксерский клуб «Богатырь»",
              "address": "г. Нижний Новгород, Ленинский район, ул. Заречная 21"
          }
      ];
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
