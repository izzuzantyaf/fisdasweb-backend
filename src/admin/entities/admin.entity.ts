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
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_admin',
  })
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  @Unique('UQ_admin_email', ['email'])
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    enumName: 'admin_role_enum',
  })
  role: AdminRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
