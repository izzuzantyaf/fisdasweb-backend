import {
  isEmpty,
  isEnum,
  isNotEmpty,
  isNotEmptyObject,
  isObject,
} from 'class-validator';
import { AssistantLevel } from 'src/assistant/constants';
import { CreateAssistantDto } from 'src/assistant/dto';
import { Gender } from 'src/common/constants';

export class CreateAssistantValidationHelper {
  private dto: CreateAssistantDto;

  constructor(assistant: CreateAssistantDto) {
    this.dto = assistant;
  }

  protected validateName() {
    if (isEmpty(this.dto.name)) return { name: 'Nama harus diisi' };
    const maxLength = 100;
    if (this.dto.name.length > maxLength)
      return { name: `Nama tidak boleh melebihi ${maxLength} karakter` };
    return true;
  }

  protected validateCode() {
    if (isEmpty(this.dto.code)) return { code: 'Kode asisten harus diisi' };
    if (this.dto.code.length !== 3)
      return { code: 'Kode asisten harus 3 karakter' };
    return true;
  }

  protected validatePhoneNumber() {
    const validationRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    if (isNotEmpty(this.dto.phone))
      if (!validationRegex.test(this.dto.phone))
        return { phoneNumber: 'Nomor telepon tidak valid' };
    return true;
  }

  protected validateGender() {
    if (isEmpty(this.dto.gender))
      return { gender: 'Jenis kelamin harus diisi' };
    if (!isEnum(this.dto.gender, Gender))
      return { gender: 'Jenis kelamin tidak valid' };
    return true;
  }

  protected validateLevel() {
    if (isEmpty(this.dto.level)) return { level: 'Level harus diisi' };
    if (!isEnum(this.dto.level, AssistantLevel))
      return { level: 'Level tidak valid' };
    return true;
  }

  protected validateFeedbackUrl() {
    if (isNotEmpty(this.dto.feedback_url))
      try {
        new URL(this.dto.feedback_url);
      } catch (e) {
        return { feedbackUrl: 'Link feedback tidak valid' };
      }
    return true;
  }

  protected validateProfilePictureUrl() {
    if (isNotEmpty(this.dto.image_url))
      try {
        new URL(this.dto.image_url);
      } catch (e) {
        return { profilePictureUrl: 'Link profile picture tidak valid' };
      }
    return true;
  }

  validateProps(): object | null {
    const validationResults = [
      this.validateName(),
      this.validateCode(),
      this.validatePhoneNumber(),
      this.validateGender(),
      this.validateLevel(),
      this.validateFeedbackUrl(),
      this.validateProfilePictureUrl(),
    ];
    const errors = validationResults.reduce(
      (error, result) => (isObject(result) ? { ...error, ...result } : error),
      {},
    );
    return isNotEmptyObject(errors) ? errors : null;
  }
}
