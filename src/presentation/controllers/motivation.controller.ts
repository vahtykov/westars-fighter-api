import { Controller, Get, HttpCode, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { MotivationService } from '../../application/services/motivation.service';

@Controller('motivation')
export class MotivationController {
  constructor(private motivationService: MotivationService) {}

  @Get('today')
  @HttpCode(HttpStatus.OK)
  async getMotivationsData(): Promise<Object> {
    try {
      const { motivation } = await this.motivationService.getToday();

      return {
        title: 'Мотивация на сегодня',
        motivation,
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An error occurred while fetching data');
    }
  }
}
