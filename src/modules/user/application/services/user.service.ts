import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserCommand } from '../commands/create-user.command';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(command: CreateUserCommand): Promise<User> {
    const user = new User(
      command.email,
      command.firstName,
      command.lastName,
      command.dateOfBirth,
      command.avatarUrl,
      command.gender
    );
    await this.userRepository.save(user);
    return user;
  }
}
