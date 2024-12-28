import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { Logger } from '@nestjs/common/services';
import { AssistantRepository } from 'src/assistant/repo';
import { Assistant } from 'src/assistant/entities';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);

  constructor(private assistantRepository: AssistantRepository) {}

  private readonly MIN_NAME_LENGTH = 1;
  private readonly MAX_NAME_LENGTH = 255;

  private readonly MIN_CODE_LENGTH = 1;
  private readonly MAX_CODE_LENGTH = 8;

  private readonly LINE_ID_REGEX = /^[a-zA-Z0-9._@-]+$/;

  async add(
    data: Pick<Assistant, 'code' | 'name'> &
      Partial<Pick<Assistant, 'line_id' | 'is_published'>>,
  ) {
    try {
      const MIN_NAME_LENGTH = this.MIN_NAME_LENGTH;
      const MAX_NAME_LENGTH = this.MAX_NAME_LENGTH;

      if (
        data.name.length < MIN_NAME_LENGTH ||
        data.name.length > MAX_NAME_LENGTH
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters`,
          ),
        );
      }

      const MIN_CODE_LENGTH = this.MIN_CODE_LENGTH;
      const MAX_CODE_LENGTH = this.MAX_CODE_LENGTH;

      if (
        data.code.length < MIN_CODE_LENGTH ||
        data.code.length > MAX_CODE_LENGTH
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Code must be between ${MIN_CODE_LENGTH} and ${MAX_CODE_LENGTH} characters`,
          ),
        );
      }

      if (
        data.line_id !== undefined &&
        data.line_id !== null &&
        !this.LINE_ID_REGEX.test(data.line_id)
      ) {
        throw new BadRequestException(
          new ErrorResponseDto('Line ID format is invalid'),
        );
      }

      const storedData = await this.assistantRepository.store(data, {
        returning: ['id', 'name', 'code', 'line_id', 'is_published'],
      });

      return storedData;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Add assistant failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async get() {
    const data = await this.assistantRepository.find({
      select: ['id', 'name', 'code', 'line_id', 'is_published'],
    });

    return data;
  }

  async getPublished() {
    const data = await this.assistantRepository.find({
      select: ['id', 'name', 'code', 'line_id'],
      where: { is_published: true },
    });

    return data;
  }

  async update(
    id: Assistant['id'],
    data: Partial<
      Pick<Assistant, 'code' | 'name' | 'line_id' | 'is_published'>
    >,
  ) {
    try {
      const MIN_NAME_LENGTH = this.MIN_NAME_LENGTH;
      const MAX_NAME_LENGTH = this.MAX_NAME_LENGTH;

      if (
        data.name !== undefined &&
        (data.name.length < MIN_NAME_LENGTH ||
          data.name.length > MAX_NAME_LENGTH)
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters`,
          ),
        );
      }

      const MIN_CODE_LENGTH = this.MIN_CODE_LENGTH;
      const MAX_CODE_LENGTH = this.MAX_CODE_LENGTH;

      if (
        data.code !== undefined &&
        (data.code.length < MIN_CODE_LENGTH ||
          data.code.length > MAX_CODE_LENGTH)
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Code must be between ${MIN_CODE_LENGTH} and ${MAX_CODE_LENGTH} characters`,
          ),
        );
      }

      if (
        data.line_id !== undefined &&
        data.line_id !== null &&
        !this.LINE_ID_REGEX.test(data.line_id)
      ) {
        throw new BadRequestException(
          new ErrorResponseDto('Line ID format is invalid'),
        );
      }

      const updateResult = await this.assistantRepository.update(id, data, {
        returning: ['id', 'name', 'code', 'line_id', 'is_published'],
      });

      return updateResult;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Update assistant failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async delete(id: Assistant['id']) {
    try {
      const deleteResult = await this.assistantRepository.softDeleteById(id, {
        returning: ['id'],
      });

      return deleteResult;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Delete assistant failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }
}
