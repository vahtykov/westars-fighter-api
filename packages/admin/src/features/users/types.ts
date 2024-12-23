import { User } from '../../types';

export type UserRole = 'admin' | 'user' | 'trainer';

export interface UserFilters {
  q?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UserFormData extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
  password?: string;
}
