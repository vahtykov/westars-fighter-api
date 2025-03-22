import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { TrainingTask } from './training-task.entity';

@Entity('training_task_runnings')
export class TrainingTaskRunning extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainingTaskId: number;

  @Column()
  userId: string;

  @CreateDateColumn()
  startTrainingTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTrainingTime: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => TrainingTask, task => task.runnings)
  @JoinColumn({ name: 'trainingTaskId' })
  task: TrainingTask;
}
