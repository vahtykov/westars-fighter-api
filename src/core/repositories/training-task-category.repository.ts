import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TrainingTaskCategory } from '../domain/entities/training-task-category.entity';
import { ITrainingTaskCategoryRepository } from './training-task-category.repository.interface';

@Injectable()
export class TrainingTaskCategoryRepository implements ITrainingTaskCategoryRepository {
  private categoryRepository: Repository<TrainingTaskCategory>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.categoryRepository = this.dataSource.getRepository(TrainingTaskCategory);
  }

  async findAll(): Promise<TrainingTaskCategory[]> {
    return this.categoryRepository.find();
  }

  async findById(id: number): Promise<TrainingTaskCategory | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }
}
