import { maxLength, minLength, isEmpty, isString } from 'class-validator';
import { CreateAdminDto } from '../../admin/dto';
import { Logger } from '@nestjs/common';

export default class RegisterAdminValidationHelper {
  private logger = new Logger(RegisterAdminValidationHelper.name);

  validateCreateAdminDto(createAdminDto: CreateAdminDto) {
    const result: Partial<Record<keyof CreateAdminDto, boolean | string>> = {
      name: this.validateName(createAdminDto.name),
      username: this.validateUsername(createAdminDto.username),
      password: this.validatePassword(createAdminDto.password),
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

  protected validateUsername(username: CreateAdminDto['username']) {
    if (isEmpty(username)) return 'username cannot be empty';
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
}
