import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { TrainingTaskCategory } from './training-task-category.entity';
import { TrainingTaskRunning } from './training-task-running.entity';
import { File } from './file.entity';

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

  @ManyToOne(() => File)
  videoFile: File;

  @Column({ nullable: true })
  videoFileId: string;

  @Column({ length: 255, nullable: true })
  videoUrl: string;

  @ManyToOne(() => File)
  imageFile: File;

  @Column({ nullable: true })
  imageFileId: string;

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  durationMinutes: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => TrainingTaskCategory, category => category.tasks)
  @JoinColumn({ name: 'categoryId' })
  category: TrainingTaskCategory;

  @OneToMany(() => TrainingTaskRunning, running => running.task)
  runnings: TrainingTaskRunning[];
}
