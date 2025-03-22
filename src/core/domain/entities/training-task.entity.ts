import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TrainingTaskCategory } from './training-task-category.entity';
import { TrainingTaskRunning } from './training-task-running.entity';

@Entity('training_tasks')
export class TrainingTask extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  videoUrl: string;

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  durationMinutes: number;

  @ManyToOne(() => TrainingTaskCategory, category => category.tasks)
  @JoinColumn({ name: 'categoryId' })
  category: TrainingTaskCategory;

  @OneToMany(() => TrainingTaskRunning, running => running.task)
  runnings: TrainingTaskRunning[];
}
