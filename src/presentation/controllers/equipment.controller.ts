import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus, Patch, NotFoundException, InternalServerErrorException, BadRequestException, Query } from '@nestjs/common';
import { EquipmentService } from '../../application/services/equipment.service';

@Controller('equipments')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getEquipmentsData(): Promise<Object> {
    try {
      const list = await this.equipmentService.getList();

      return {
        title: 'Экипировка',
        list
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
      return await this.equipmentService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Equipment with id ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while fetching the data');
    }
  }
}
