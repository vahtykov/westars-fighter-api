import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { TrainingTaskCategory } from './training-task-category.entity';

@Entity('user_task_categories')
export class UserTaskCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  taskCategoryId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => TrainingTaskCategory)
  @JoinColumn({ name: 'taskCategoryId' })
  category: TrainingTaskCategory;
}