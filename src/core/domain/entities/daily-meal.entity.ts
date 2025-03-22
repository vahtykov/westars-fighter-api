import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import { Meal } from './meal.entity';
import { MealCategory } from './meal-category.entity';

@Entity('daily_meals')
export class DailyMeal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'date' })
  date: Date;

  @ManyToOne(() => Meal)
  @JoinColumn({ name: 'mealId' })
  meal: Meal;

  @Column()
  mealId: number;

  @ManyToOne(() => MealCategory)
  @JoinColumn({ name: 'categoryId' })
  category: MealCategory;

  @Column()
  categoryId: number;

  @Column({ default: 1 })
  sortOrder: number;
}
