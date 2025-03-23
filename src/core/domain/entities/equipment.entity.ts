import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { File } from './file.entity';

@Entity('equipments')
export class Equipment extends BaseEntity {
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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, length: 255 })
  category: string;

  @Column({ nullable: true, length: 255 })
  brand: string;

  @Column({ nullable: true, type: 'json' })
  sizes: object;

  @Column({ nullable: true, type: 'json' })
  colors: object;

  @Column({ nullable: true, type: 'boolean', default: true })
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
