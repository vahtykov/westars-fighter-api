import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { File } from './file.entity';

@Entity('gyms')
export class Gym extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => File)
  previewFile: File;

  @Column({ nullable: true })
  previewFileId: string;

  @Column({ length: 255 })
  previewUrl: string;

  @Column({ length: 255 })
  address: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ nullable: true, length: 255 })
  phone: string;

  @Column({ nullable: true, length: 255 })
  website: string;

  @Column({ nullable: true, length: 255 })
  workingHours: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
