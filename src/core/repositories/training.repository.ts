import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';
import { Training } from '../domain/entities/training.entity';
import { ITrainingRepository } from './training.repository.interface';
import { PaginationCursor, decodeCursor } from '../../utils/cursor.util';

@Injectable()
export class TrainingRepository implements ITrainingRepository {
  private trainingRepository: Repository<Training>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.trainingRepository = this.dataSource.getRepository(Training);
  }

  async findAll(cursor?: string, limit: number = 10, isBackward: boolean = false): Promise<Training[]> {
    const query = this.trainingRepository.createQueryBuilder('training')
      .orderBy('training.createdAt', isBackward ? 'ASC' : 'DESC')
      .addOrderBy('training.id', isBackward ? 'ASC' : 'DESC')
      .take(limit + 1); // Fetch one extra to check for more items

    if (cursor) {
      const decodedCursor = decodeCursor(cursor);
      if (isBackward) {
        query.where('(training.createdAt, training.id) > (:createdAt, :id)', decodedCursor);
      } else {
        query.where('(training.createdAt, training.id) < (:createdAt, :id)', decodedCursor);
      }
    }

    const results = await query.getMany();
    return isBackward ? results.reverse() : results;
  }

  async getTotal(): Promise<number> {
    return this.trainingRepository.count();
  }

  async findById(id: number): Promise<Training | null> {
    return this.trainingRepository.findOne({ where: { id } });
  }

  async create(trainingData: Partial<Training>): Promise<Training> {
    const training = this.trainingRepository.create(trainingData);
    return this.trainingRepository.save(training);
  }

  async update(id: number, trainingData: Partial<Training>): Promise<Training> {
    await this.trainingRepository.update(id, trainingData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.trainingRepository.delete(id);
  }
}
