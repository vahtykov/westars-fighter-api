import { Equipment } from '../domain/entities/equipment.entity';

export interface IEquipmentRepository {
  findAll(): Promise<Equipment[]>;
  findById(id: number): Promise<Equipment | null>;
}
