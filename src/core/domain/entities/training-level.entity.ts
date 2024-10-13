import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Training } from './training.entity';

@Entity('training_levels')
export class TrainingLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @OneToMany(() => Training, training => training.level)
  trainings: Training[];
}
