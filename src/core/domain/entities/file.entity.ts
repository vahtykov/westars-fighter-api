import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user.entity';

@Entity('files')
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

  @CreateDateColumn({ type: 'timestamp with time zone' })
  uploadedAt: Date;

  @ManyToOne('User', 'files')
  user: User;
}