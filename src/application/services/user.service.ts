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

  async getUserById(userId: string): Promise<Partial<User>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.sanitizeUser(user);
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

  async isUserActive(userId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return false;
    }
    // Check if the user has been active within the last 360 days
    const thirtyDaysAgo = new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);
    return user.lastActivityAt > thirtyDaysAgo;
  }

  async updateLastActivity(userId: string): Promise<void> {
    await this.userRepository.update(userId, { lastActivityAt: new Date() });
  }

  private sanitizeUser(user: User): Partial<User> {
    const { refreshToken, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}