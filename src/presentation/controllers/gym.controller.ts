import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus, Patch, NotFoundException, InternalServerErrorException, BadRequestException, Query } from '@nestjs/common';
import { GymService } from '../../application/services/gym.service';

@Controller('gyms')
export class GymController {
  constructor(private gymService: GymService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getGymsData(): Promise<Object> {
    try {
      const gymsList = await this.gymService.getList();

      return {
        title: 'Залы',
        list: gymsList
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An error occurred while fetching data');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: number): Promise<Object> {
    try {
      return await this.gymService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Gym with id ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while fetching the data');
    }
  }
}
