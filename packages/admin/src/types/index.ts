export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: string;
}

export interface Training extends BaseEntity {
  name: string;
  title: string;
  description: string;
  previewUrl?: string;
  videoUrl?: string;
  levelId: string;
  isPublished: boolean;
}

export interface TrainingLevel extends BaseEntity {
  name: string;
  description: string;
  order: number;
}