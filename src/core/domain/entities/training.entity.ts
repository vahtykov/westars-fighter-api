import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, UpdateDateColumn } from 'typeorm';

@Entity('trainings')
@Index(['createdAt', 'id'], { unique: true })
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  previewUrl: string;

  @Column({ length: 255 })
  videoUrl: string;

  @Column({ nullable: true, length: 255 })
  title: string;

  @Column({ nullable: true, type: 'text' })
  fullText: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
