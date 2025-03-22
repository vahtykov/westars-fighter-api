import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { MealCategory } from './meal-category.entity';

@Entity('meals')
export class Meal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

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

  @ManyToOne(() => MealCategory, category => category.meals)
  @JoinColumn({ name: 'categoryId' })
  category: MealCategory;

  @Column()
  categoryId: number;
}
