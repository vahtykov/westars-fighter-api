import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrainingLevel } from '../domain/entities/training-level.entity';
import { ITrainingLevelRepository } from './training-level.interface.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class TrainingLevelRepository implements ITrainingLevelRepository {
  private trainingLevelRepository: Repository<TrainingLevel>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.trainingLevelRepository = this.dataSource.getRepository(TrainingLevel);
  }

  async findAll(): Promise<TrainingLevel[]> {
    return this.trainingLevelRepository.find();
  }
}

