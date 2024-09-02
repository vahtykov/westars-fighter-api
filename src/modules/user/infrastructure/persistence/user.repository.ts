import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    // return this.users.find(user => user.id === id) || null;
    return null;
  }

  async save(user: User): Promise<void> {
    return;
  }
}
