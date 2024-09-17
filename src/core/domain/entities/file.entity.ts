import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  bucketName: string;

  @Column()
  key: string;

  @Column()
  url: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @ManyToOne('User', 'files')
  user: User;
}