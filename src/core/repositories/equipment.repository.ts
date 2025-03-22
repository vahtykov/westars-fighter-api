import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Equipment } from '../domain/entities/equipment.entity';
import { IEquipmentRepository } from './equipment.repository.interface';

@Injectable()
export class EquipmentRepository implements IEquipmentRepository {
  private equipmentRepository: Repository<Equipment>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.equipmentRepository = this.dataSource.getRepository(Equipment);
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  async findById(id: number): Promise<Equipment | null> {
    return this.equipmentRepository.findOne({ where: { id } });
  }
}
