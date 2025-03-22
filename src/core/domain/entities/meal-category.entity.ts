import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Meal } from './meal.entity';

@Entity('meal_categories')
export class MealCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  alias: string;

  @OneToMany(() => Meal, meal => meal.category)
  meals: Meal[];
}
