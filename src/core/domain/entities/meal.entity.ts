// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, UpdateDateColumn, ManyToOne, BaseEntity } from 'typeorm';

// @Entity('meals')
// @Index(['createdAt', 'id'], { unique: true })
// @Index(['type'])
// export class Meal extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ length: 255 })
//   name: string;

//   @ManyToOne(() => File)
//   previewFile: File;

//   @Column({ nullable: true })
//   previewFileId: string;

//   @Column({ length: 255, nullable: true })
//   previewUrl: string;

//   @Column({ type: 'smallint' })
//   ccal: number;

//   @Column({ nullable: true, type: 'text' })
//   fullText: string;

//   @Column({ length: 20 })
//   type: string;

//   @CreateDateColumn({ type: 'timestamp with time zone' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp with time zone' })
//   updatedAt: Date;
// }
