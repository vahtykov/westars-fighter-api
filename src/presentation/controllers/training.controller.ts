import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus, Patch, NotFoundException, InternalServerErrorException, BadRequestException, Query } from '@nestjs/common';
import { TrainingService } from '../../application/services/training.service';
import { Training } from '../../core/domain/entities/training.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('trainings')
@UseGuards(JwtAuthGuard)
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTrainings(
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
    @Query('backward') backward?: string
  ): Promise<{ trainings: Training[], nextCursor: string | null, prevCursor: string | null }> {
    try {
      const isBackward = backward === 'true';
      const parsedLimit = limit ? parseInt(limit, 10) : undefined;
      const validLimit = !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : undefined;

      const { trainings, nextCursor, prevCursor } = await this.trainingService.getAllTrainings(cursor, validLimit, isBackward);
      return { trainings, nextCursor, prevCursor };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An error occurred while fetching trainings');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrainingById(@Param('id') id: number): Promise<Training> {
    try {
      return await this.trainingService.getTrainingById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Training with id ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while fetching the training');
    }
  }

  @Put()
  @HttpCode(HttpStatus.CREATED)
  async createTraining(@Body() trainingData: Partial<Training>): Promise<Training> {
    try {
      return await this.trainingService.createTraining(trainingData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while creating the training');
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateTraining(@Param('id') id: number, @Body() trainingData: Partial<Training>): Promise<Training> {
    try {
      return await this.trainingService.updateTraining(id, trainingData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Training with id ${id} not found`);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while updating the training');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTraining(@Param('id') id: number): Promise<void> {
    try {
      await this.trainingService.deleteTraining(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Training with id ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while deleting the training');
    }
  }
}