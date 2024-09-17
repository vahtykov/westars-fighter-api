import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IUserRepository } from '../../core/repositories/user.repository.interface';
import { User } from '../../core/domain/entities/user.entity';
import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository
  ) {}

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepository.update(userId, {
      ...updateUserDto,
      birthDate: updateUserDto.birthDate ? new Date(updateUserDto.birthDate) : null,
    });
    return updatedUser;
  }
}