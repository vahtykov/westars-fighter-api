import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { File } from './file.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ nullable: true, length: 100 })
  firstName: string;

  @Column({ nullable: true, length: 100})
  lastName: string;

  @Column({ nullable: true, length: 50 })
  phone: string;

  @Column({ nullable: true, length: 255 })
  avatarUrl: string;

  @Column({ nullable: true, type: 'date' })
  birthDate: Date;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  lastActivityAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ nullable: true, length: 500 })
  aboutText: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany('File', 'user')
  files: File[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }

  async setRefreshToken(token: string) {
    this.refreshToken = await bcrypt.hash(token, 10);
  }

  async compareRefreshToken(token: string): Promise<boolean> {
    return bcrypt.compare(token, this.refreshToken);
  }
}