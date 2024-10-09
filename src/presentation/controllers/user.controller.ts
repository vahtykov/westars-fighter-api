import { Controller, Get, Patch, Body, Param, UseGuards, UseFilters, HttpCode, HttpStatus, Req, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../../core/domain/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Req() req: any): Promise<Partial<User>> {
    try {
      const userId = req.user.userId;
      return await this.userService.getUserById(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('An error occurred while fetching user data');
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string): Promise<Partial<User>> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw new InternalServerErrorException('An error occurred while fetching user data');
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An error occurred while updating user data');
    }
  }
}