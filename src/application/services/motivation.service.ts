import { Injectable, Inject } from '@nestjs/common';
import { IMotivationRepository } from '../../core/repositories/motivation.repository.interface';

@Injectable()
export class MotivationService {
  constructor(
    @Inject('IMotivationRepository')
    private motivationRepository: IMotivationRepository
  ) {}

  async getToday(): Promise<{ motivation: string; }> {
    try {
      const todayMotivation = await this.motivationRepository.findToday();
      
      if (todayMotivation) {
        return {
          motivation: todayMotivation.motivation
        };
      }
      
      // Если мотивации на сегодня нет, возвращаем дефолтную
      return {
        motivation: "Каждый шаг вперед делает тебя сильнее.\nВ каждом повторении кроется твой рост,\nа каждая тренировка приближает к цели" 
      };
    } catch (error) {
      console.error('Error fetching motivation:', error);
      // В случае ошибки возвращаем дефолтную мотивацию
      return {
        motivation: "Каждый шаг вперед делает тебя сильнее.\nВ каждом повторении кроется твой рост,\nа каждая тренировка приближает к цели" 
      };
    }
  }
}
