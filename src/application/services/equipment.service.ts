import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class EquipmentService {
  constructor(
    // @Inject('ITrainingRepository')
    // private trainingRepository: ITrainingRepository,
  ) {}

  async getList(): Promise<Object> {
    return [
          {
              "id": 1,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/equipments/1-min.png",
              "name": "WIND FBR WHITE",
              "price": 9900
          },
          {
              "id": 2,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/equipments/2-min.png",
              "name": "Пуховый жилет W MMA DARK BLUE",
              "price": 9250
          },
          {
              "id": 3,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/equipments/3-min.png",
              "name": "Футболка СОЮЗ ММА",
              "price": 2500
          },
          {
              "id": 4,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/equipments/4-min.png",
              "name": "Футболка СОЮЗ ММА",
              "price": 2500
          },
          {
              "id": 5,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/equipments/5-min.png",
              "name": "Олимпийка MMA PROFESSIONAL",
              "price": 4250
          },
          {
              "id": 6,
              "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/equipments/6-min.png",
              "name": "Олимпийка MMA PRO",
              "price": 6500
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
