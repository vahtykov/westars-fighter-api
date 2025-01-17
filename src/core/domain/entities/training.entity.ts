import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { File } from './file.entity';
import { TrainingLevel } from './training-level.entity';

@Entity('trainings')
@Index(['createdAt', 'id'], { unique: true })
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => File)
  previewFile: File;

  @Column({ nullable: true })
  previewFileId: string;

  @Column({ length: 255, nullable: true })
  previewUrl: string;

  @ManyToOne(() => File)
  videoFile: File;

  @Column({ nullable: true })
  videoFileId: string;

  @Column({ length: 255 })
  videoUrl: string;

  @Column({ nullable: true, length: 255 })
  title: string;

  @Column({ nullable: true, type: 'text' })
  fullText: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorUserId' })
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => TrainingLevel, level => level.trainings, { nullable: true })
  @JoinColumn({ name: 'levelId' })
  level: TrainingLevel;

  @Column({ nullable: true })
  levelId: number;
}
