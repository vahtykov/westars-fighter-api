import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus, Patch, NotFoundException, InternalServerErrorException, BadRequestException, Query } from '@nestjs/common';
import { MealService } from '../../application/services/meal.service';

@Controller('meals')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get('today')
  @HttpCode(HttpStatus.OK)
  async getToday(): Promise<Object> {
    try {
      return await this.mealService.getToday();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An error occurred while fetching meals');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: number): Promise<Object> {
    try {
      return await this.mealService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Meal with id ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while fetching the meal');
    }
  }
}
