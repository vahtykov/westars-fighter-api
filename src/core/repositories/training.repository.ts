import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, LessThan, MoreThan } from 'typeorm';
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

  async findAll(cursor?: string, limit?: number, isBackward?: boolean, levelId?: number): Promise<Training[]> {
    let query = this.trainingRepository.createQueryBuilder('training')
      .orderBy('training.createdAt', isBackward ? 'ASC' : 'DESC')
      .addOrderBy('training.id', isBackward ? 'ASC' : 'DESC');

    if (levelId) {
      query = query.andWhere('training.levelId = :levelId', { levelId });
    }

    if (cursor) {
      const { createdAt, id } = decodeCursor(cursor);
      if (isBackward) {
        query.where('(training.createdAt > :createdAt) OR (training.createdAt = :createdAt AND training.id > :id)', { createdAt, id });
      } else {
        query.where('(training.createdAt < :createdAt) OR (training.createdAt = :createdAt AND training.id < :id)', { createdAt, id });
      }
    }

    if (limit) {
      query.take(limit);
    }

    let results = await query.getMany();

    // For backward pagination, we need to reverse the results
    if (isBackward) {
      results = results.reverse();
    }

    return results;
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

  async findFirst(): Promise<Training | null> {
    return this.trainingRepository.createQueryBuilder('training')
      .orderBy('training.createdAt', 'ASC')
      .addOrderBy('training.id', 'ASC')
      .getOne();
  }

  async isFirstBatch(createdAt: Date, id: number): Promise<boolean> {
    const count = await this.trainingRepository.count({
      where: [
        { createdAt: LessThan(createdAt) },
        { createdAt, id: LessThan(id) }
      ]
    });
    return count === 0;
  }

  async isLastBatch(createdAt: Date, id: number): Promise<boolean> {
    const count = await this.trainingRepository.count({
      where: [
        { createdAt: MoreThan(createdAt) },
        { createdAt, id: MoreThan(id) }
      ]
    });
    return count === 0;
  }
}
