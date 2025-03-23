import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { MealCategory } from './meal-category.entity';
import { File } from './file.entity';

@Entity('meals')
export class Meal extends BaseEntity {
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

  @Column()
  ccal: number;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  proteins: number;

  @Column({ nullable: true })
  fats: number;

  @Column({ nullable: true })
  carbs: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => MealCategory, category => category.meals)
  @JoinColumn({ name: 'categoryId' })
  category: MealCategory;

  @Column()
  categoryId: number;
}
