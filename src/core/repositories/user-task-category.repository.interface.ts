import { UserTaskCategory } from '../domain/entities/user-task-category.entity';

export interface IUserTaskCategoryRepository {
  findByUserId(userId: string): Promise<UserTaskCategory[]>;
  findByUserAndCategory(userId: string, categoryId: number): Promise<UserTaskCategory | null>;
}
