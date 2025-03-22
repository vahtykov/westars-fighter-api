import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('motivations')
export class Motivation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  motivation: string;

  @Column({ type: 'date', unique: true })
  date: Date;
}
