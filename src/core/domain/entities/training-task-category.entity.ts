import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { TrainingTask } from './training-task.entity';

@Entity('training_task_categories')
export class TrainingTaskCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  imageUrl: string;

  @OneToMany(() => TrainingTask, task => task.category)
  tasks: TrainingTask[];
}
