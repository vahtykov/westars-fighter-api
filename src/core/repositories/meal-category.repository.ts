import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MealCategory } from '../domain/entities/meal-category.entity';
import { IMealCategoryRepository } from './meal-category.repository.interface';

@Injectable()
export class MealCategoryRepository implements IMealCategoryRepository {
  private categoryRepository: Repository<MealCategory>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.categoryRepository = this.dataSource.getRepository(MealCategory);
  }

  async findAll(): Promise<MealCategory[]> {
    return this.categoryRepository.find();
  }

  async findById(id: number): Promise<MealCategory | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async findByAlias(alias: string): Promise<MealCategory | null> {
    return this.categoryRepository.findOne({ where: { alias } });
  }
}
