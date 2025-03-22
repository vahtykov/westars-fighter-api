import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserTaskCategory } from '../domain/entities/user-task-category.entity';
import { IUserTaskCategoryRepository } from './user-task-category.repository.interface';

@Injectable()
export class UserTaskCategoryRepository implements IUserTaskCategoryRepository {
  private userTaskCategoryRepository: Repository<UserTaskCategory>;

  constructor(
    @Inject(DataSource) private dataSource: DataSource
  ) {
    this.userTaskCategoryRepository = this.dataSource.getRepository(UserTaskCategory);
  }

  async findByUserId(userId: string): Promise<UserTaskCategory[]> {
    return this.userTaskCategoryRepository.find({
      where: { userId },
      relations: ['category']
    });
  }

  async findByUserAndCategory(userId: string, categoryId: number): Promise<UserTaskCategory | null> {
    return this.userTaskCategoryRepository.findOne({
      where: { userId, taskCategoryId: categoryId }
    });
  }
}
