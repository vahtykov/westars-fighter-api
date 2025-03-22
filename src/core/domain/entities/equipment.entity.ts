import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('equipments')
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

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
}
