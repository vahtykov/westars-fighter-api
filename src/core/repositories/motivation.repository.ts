import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Motivation } from '../domain/entities/motivation.entity';
import { IMotivationRepository } from './motivation.repository.interface';

@Injectable()
export class MotivationRepository implements IMotivationRepository {
  private motivationRepository: Repository<Motivation>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.motivationRepository = this.dataSource.getRepository(Motivation);
  }

  async findByDate(date: Date): Promise<Motivation | null> {
    // Преобразуем дату в строку формата 'YYYY-MM-DD' для корректного сравнения
    const dateString = date.toISOString().split('T')[0];
    
    return this.motivationRepository
      .createQueryBuilder('motivation')
      .where('TO_CHAR(motivation.date, \'YYYY-MM-DD\') = :dateString', { dateString })
      .getOne();
  }

  async findToday(): Promise<Motivation | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.findByDate(today);
  }
}