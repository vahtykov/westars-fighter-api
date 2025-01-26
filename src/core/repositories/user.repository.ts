import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../core/domain/entities/user.entity';
import { IUserRepository } from '../../core/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        birthDate: true,
        aboutText: true,
        lastActivityAt: true,
      },
    });
  }

  async findByEmail(email: string, exceptHiddenFields: boolean = true): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: exceptHiddenFields ? {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        birthDate: true,
        aboutText: true,
        lastActivityAt: true,
        isAdmin: true,
      } : {},
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findById(id);
  }
}