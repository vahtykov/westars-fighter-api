import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Meal } from '../domain/entities/meal.entity';
import { IMealRepository } from './meal.repository.interface';

@Injectable()
export class MealRepository implements IMealRepository {
  private mealRepository: Repository<Meal>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.mealRepository = this.dataSource.getRepository(Meal);
  }

  async findAll(): Promise<Meal[]> {
    return this.mealRepository.find();
  }

  async findById(id: number): Promise<Meal | null> {
    return this.mealRepository.findOne({ where: { id } });
  }

  async findByCategory(categoryId: number): Promise<Meal[]> {
    return this.mealRepository.find({ where: { categoryId } });
  }
}
