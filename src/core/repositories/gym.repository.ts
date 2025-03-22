import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Gym } from '../domain/entities/gym.entity';
import { IGymRepository } from './gym.repository.interface';

@Injectable()
export class GymRepository implements IGymRepository {
  private gymRepository: Repository<Gym>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.gymRepository = this.dataSource.getRepository(Gym);
  }

  async findAll(): Promise<Gym[]> {
    return this.gymRepository.find();
  }

  async findById(id: number): Promise<Gym | null> {
    return this.gymRepository.findOne({ where: { id } });
  }
}
