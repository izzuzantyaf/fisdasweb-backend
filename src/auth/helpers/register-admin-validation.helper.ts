import {
  maxLength,
  isEmail,
  minLength,
  isEnum,
  isEmpty,
  isString,
} from 'class-validator';
import { AdminRole } from '../../admin/constants';
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
    this.logger.debug(`create admin dto validation: ${JSON.stringify(result)}`);
    return {
      isSafe,
      result: result,
    };
  }

  protected validateName(name: CreateAdminDto['name']) {
    const maxNameLength = 100;
    if (isEmpty(name)) return 'name cannot be empty';
    if (!isString(name)) return 'name is invalid';
    if (!maxLength(name, maxNameLength))
      return `name length max ${maxNameLength} characters`;
    return true;
  }

  protected validateEmail(email: CreateAdminDto['email']) {
    if (isEmpty(email)) return 'email cannot be empty';
    if (!isEmail(email)) return 'email is invalid';
    return true;
  }

  protected validatePassword(password: CreateAdminDto['password']) {
    const minPasswordLength = 6;
    if (isEmpty(password)) return 'password cannot be empty';
    if (!isString(password)) return 'password is invalid';
    if (!minLength(password, minPasswordLength))
      return `password length min ${minPasswordLength} characters`;
    return true;
  }

  protected validateRole(role: CreateAdminDto['role']) {
    if (isEmpty(role)) return 'role cannot be empty';
    if (!isEnum(role, AdminRole)) return 'role is invalid';
    return true;
  }
}
