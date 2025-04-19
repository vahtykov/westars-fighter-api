import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { TrainingTask } from './training-task.entity';
import { File } from './file.entity';

@Entity('training_task_categories')
export class TrainingTaskCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'smallint', nullable: true })
  order: number;

  @ManyToOne(() => File)
  imageFile: File;

  @Column({ nullable: true })
  imageFileId: string;

  @Column({ length: 255 })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => TrainingTask, task => task.category)
  tasks: TrainingTask[];
}
