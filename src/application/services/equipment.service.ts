import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IEquipmentRepository } from '../../core/repositories/equipment.repository.interface';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject('IEquipmentRepository')
    private equipmentRepository: IEquipmentRepository
  ) {}

  async getList(): Promise<Object[]> {
    try {
      const equipments = await this.equipmentRepository.findAll();
      
      if (equipments && equipments.length > 0) {
        return equipments.map(equipment => ({
          id: equipment.id,
          previewUrl: equipment.previewUrl,
          name: equipment.name,
          price: equipment.price
        }));
      }
      
      // Если данных нет, возвращаем моковые данные
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
    } catch (error) {
      console.error('Error fetching equipments:', error);
      // В случае ошибки возвращаем моковые данные
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
  }

  async getById(id: number): Promise<Object> {
    const equipment = await this.equipmentRepository.findById(id);
    
    if (!equipment) {
      throw new NotFoundException(`Equipment with id ${id} not found`);
    }
    
    return {
      id: equipment.id,
      previewUrl: equipment.previewUrl,
      name: equipment.name,
      price: equipment.price,
      description: equipment.description,
      category: equipment.category,
      brand: equipment.brand,
      sizes: equipment.sizes,
      colors: equipment.colors,
      isAvailable: equipment.isAvailable
    };
  }
}
