import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Training } from './training.entity';

@Entity('training_levels')
export class TrainingLevel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @OneToMany(() => Training, training => training.level)
  trainings: Training[];
}
