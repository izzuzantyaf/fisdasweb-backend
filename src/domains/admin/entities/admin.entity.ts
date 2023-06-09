import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AdminRole } from 'src/core/constants';
import {
  isEmail,
  isEmpty,
  isEnum,
  isNotEmptyObject,
  isObject,
  maxLength,
  minLength,
} from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export type AdminDocument = Admin & Document;

export type AdminConstructorProps = Pick<
  Admin,
  '_id' | 'name' | 'email' | 'password' | 'role'
>;

@Schema({ timestamps: true })
export class Admin {
  _id?: any;
  @Prop({ required: true })
  name: string;
  @Exclude()
  @Prop({ required: true, unique: true })
  email: string;
  @ApiHideProperty()
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: AdminRole;

  constructor(props?: AdminConstructorProps) {
    const { _id, name, email, password, role } = props;
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  protected validateName() {
    const maxNameLength = 100;
    if (isEmpty(this.name)) return { name: 'Nama harus diisi' };
    if (!maxLength(this.name, maxNameLength))
      return { name: `Nama maksimal ${maxNameLength} karakter` };
    return true;
  }

  protected validateEmail() {
    if (isEmpty(this.email)) return { email: 'Email harus diisi' };
    if (!isEmail(this.email)) return { email: 'Email tidak valid' };
    return true;
  }

  protected validatePassword() {
    const minPasswordLength = 6;
    if (isEmpty(this.password)) return { password: 'Password harus diisi' };
    if (!minLength(this.password, minPasswordLength))
      return { password: `Password minimal ${minPasswordLength} karakter` };
    return true;
  }

  protected validateRole() {
    if (isEmpty(this.role)) return { role: 'Role harus diisi' };
    if (!isEnum(this.role, AdminRole)) return { role: 'Role tidak valid' };
    return true;
  }

  validateProps() {
    const validationResults = [
      this.validateName(),
      this.validateEmail(),
      this.validatePassword(),
      this.validateRole(),
    ];
    const errors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    return isNotEmptyObject(errors) ? errors : null;
  }

  async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
    return this.password;
  }

  async verifyPassword(passwordToBeVerified: string) {
    return await bcrypt.compare(passwordToBeVerified, this.password);
  }
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
