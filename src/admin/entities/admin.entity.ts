import { AdminRole } from '../constants';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Admin {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_admin',
  })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @Unique('UQ_admin_email', ['email'])
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
  })
  role: AdminRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
