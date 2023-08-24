import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import AdminRole from '../constants/admin-role.constant';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export type AdminConstructorProps = Pick<
  Admin,
  '_id' | 'name' | 'email' | 'password' | 'role' | 'created_at' | 'updated_at'
>;

@Entity()
@Schema({ timestamps: true })
export class Admin {
  _id?: any;

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

  constructor(props?: AdminConstructorProps) {
    const { _id, name, email, password, role } = props ?? {};
    this._id = _id ?? null;
    this.name = name ?? null;
    this.email = email ?? null;
    this.password = password ?? null;
    this.role = role ?? null;
  }
}

export type AdminDocument = Admin & Document;
export const AdminSchema = SchemaFactory.createForClass(Admin);
