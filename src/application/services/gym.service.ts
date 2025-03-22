import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IGymRepository } from '../../core/repositories/gym.repository.interface';

@Injectable()
export class GymService {
  constructor(
    @Inject('IGymRepository')
    private gymRepository: IGymRepository
  ) {}

  async getList(): Promise<Object[]> {
    try {
      const gyms = await this.gymRepository.findAll();

      if (gyms && gyms.length > 0) {
        return gyms.map(gym => ({
          id: gym.id,
          previewUrl: gym.previewUrl,
          name: gym.name,
          address: gym.address
        }));
      }

      // Если данных нет, возвращаем моковые данные
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
          "name": "Школа бокса Андрея Гоголева",
          "address": "г. Нижний Новгород, Нижегородский район, ул. Белинского 32"
        },
        {
          "id": 3,
          "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/3-min.png",
          "name": "Школа бокса Нижний Новгород",
          "address": "г. Нижний Новгород, Советский район, ул. Бекетова 3Б"
        }
      ];
    } catch (error) {
      console.error('Error fetching gyms:', error);
      // В случае ошибки возвращаем моковые данные
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
          "name": "Школа бокса Андрея Гоголева",
          "address": "г. Нижний Новгород, Нижегородский район, ул. Белинского 32"
        },
        {
          "id": 3,
          "previewUrl": "https://s3.timeweb.cloud/3067f90d-fighter-app/gyms/3-min.png",
          "name": "Школа бокса Нижний Новгород",
          "address": "г. Нижний Новгород, Советский район, ул. Бекетова 3Б"
        }
      ];
    }
  }

  async getById(id: number): Promise<Object> {
    const gym = await this.gymRepository.findById(id);
    
    if (!gym) {
      throw new NotFoundException(`Gym with id ${id} not found`);
    }
    
    return {
      id: gym.id,
      previewUrl: gym.previewUrl,
      name: gym.name,
      address: gym.address,
      description: gym.description,
      latitude: gym.latitude,
      longitude: gym.longitude,
      phone: gym.phone,
      website: gym.website,
      workingHours: gym.workingHours
    };
  }
}
