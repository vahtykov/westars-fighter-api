import { Injectable } from '@nestjs/common';

@Injectable()
export class MotivationService {
  constructor() {}

  async getToday(): Promise<{ motivation: string; }> {
    return {
      motivation: "Каждый шаг вперед делает тебя сильнее.\nВ каждом повторении кроется твой рост,\nа каждая тренировка приближает к цели" 
    };
  }
}
