import { User } from '../domain/entities/user.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string, exceptHiddenFields?: boolean): Promise<User | null>;
  create(userData: Partial<User>): Promise<User>;
  save(user: User): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
}