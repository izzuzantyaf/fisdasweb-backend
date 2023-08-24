import {
  maxLength,
  isEmail,
  minLength,
  isEnum,
  isEmpty,
  isString,
} from 'class-validator';
import AdminRole from '../../admin/constants/admin-role.constant';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { Logger } from '@nestjs/common';

export default class RegisterAdminValidationHelper {
  private logger = new Logger(RegisterAdminValidationHelper.name);

  validateCreateAdminDto(createAdminDto: CreateAdminDto) {
    const result: Partial<Record<keyof CreateAdminDto, boolean | string>> = {
      name: this.validateName(createAdminDto.name),
      email: this.validateEmail(createAdminDto.email),
      password: this.validatePassword(createAdminDto.password),
      role: this.validateRole(createAdminDto.role),
    };
    const isSafe = Object.values(result).every((error) => error === true);
    this.logger.debug(`Validation result: ${JSON.stringify(result)}`);
    return {
      isSafe,
      result: result,
    };
  }

  protected validateName(name: CreateAdminDto['name']) {
    const maxNameLength = 100;
    if (isEmpty(name)) return 'Nama tidak boleh kosong';
    if (!isString(name)) return 'Nama tidak valid';
    if (!maxLength(name, maxNameLength))
      return `Nama maksimal ${maxNameLength} karakter`;
    return true;
  }

  protected validateEmail(email: CreateAdminDto['email']) {
    if (isEmpty(email)) return 'Email tidak boleh kosong';
    if (!isEmail(email)) return 'Email tidak valid';
    return true;
  }

  protected validatePassword(password: CreateAdminDto['password']) {
    const minPasswordLength = 6;
    if (isEmpty(password)) return 'Password tidak boleh kosong';
    if (!isString(password)) return 'Password tidak valid';
    if (!minLength(password, minPasswordLength))
      return `Password minimal ${minPasswordLength} karakter`;
    return true;
  }

  protected validateRole(role: CreateAdminDto['role']) {
    if (isEmpty(role)) return 'Role tidak boleh kosong';
    if (!isEnum(role, AdminRole)) return 'Role tidak valid';
    return true;
  }
}
