import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('gyms')
export class Gym extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

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
}
