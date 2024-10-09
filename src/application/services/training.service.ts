import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITrainingRepository } from '../../core/repositories/training.repository.interface';
import { Training } from '../../core/domain/entities/training.entity';
import { encodeCursor } from '../../utils/cursor.util';

@Injectable()
export class TrainingService {
  constructor(
    @Inject('ITrainingRepository')
    private trainingRepository: ITrainingRepository
  ) {}

  async getAllTrainings(cursor?: string, limit?: number, isBackward: boolean = false): Promise<{trainings: Training[], nextCursor: string | null, prevCursor: string | null}> {
    const validLimit = limit || 10; // Default to 10 if limit is not provided
    const trainings = await this.trainingRepository.findAll(cursor, validLimit + 1, isBackward);
    
    let hasMore = trainings.length > validLimit;
    if (hasMore) {
      trainings.pop(); // Remove the extra item
    }

    const totalCount = await this.trainingRepository.getTotal();
    const isFirstPage = !cursor && !isBackward;
    const isLastPage = !cursor && isBackward;

    let nextCursor = null;
    let prevCursor = null;

    if (!isLastPage && hasMore) {
      nextCursor = encodeCursor({
        createdAt: trainings[trainings.length - 1].createdAt,
        id: trainings[trainings.length - 1].id
      });
    }

    if (!isFirstPage && trainings.length > 0) {
      prevCursor = encodeCursor({
        createdAt: trainings[0].createdAt,
        id: trainings[0].id
      });
    }

    return { trainings, nextCursor, prevCursor };
  }

  async getTrainingById(id: number): Promise<Training> {
    const training = await this.trainingRepository.findById(id);
    if (!training) {
      throw new NotFoundException('Training not found');
    }
    return training;
  }

  async createTraining(trainingData: Partial<Training>): Promise<Training> {
    return this.trainingRepository.create(trainingData);
  }

  async updateTraining(id: number, trainingData: Partial<Training>): Promise<Training> {
    const training = await this.trainingRepository.findById(id);
    if (!training) {
      throw new NotFoundException('Training not found');
    }
    return this.trainingRepository.update(id, trainingData);
  }

  async deleteTraining(id: number): Promise<void> {
    const training = await this.trainingRepository.findById(id);
    if (!training) {
      throw new NotFoundException('Training not found');
    }
    await this.trainingRepository.delete(id);
  }
}
