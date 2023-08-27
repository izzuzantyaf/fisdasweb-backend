import { Prop, Schema } from '@nestjs/mongoose';
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
@Schema({ timestamps: true })
export default class Admin {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_admin',
  })
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  @Prop({ required: true })
  name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  @Unique('UQ_admin_email', ['email'])
  @Prop({ required: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Prop({ required: true })
  password: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    enumName: 'admin_role_enum',
  })
  @Prop({ required: true, type: String, enum: AdminRole })
  role: AdminRole;

  @CreateDateColumn()
  @Prop({ type: Date })
  created_at: Date;

  @UpdateDateColumn()
  @Prop({ type: Date })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
