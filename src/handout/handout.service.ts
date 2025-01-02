import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { SortOrder } from 'src/common/types';
import {
  AddHandoutDto,
  HandoutSortKey,
  UpdateHandoutDto,
} from 'src/handout/dto';
import { Handout } from 'src/handout/entities';
import { HandoutRepository } from 'src/handout/repo';

@Injectable()
export class HandoutService {
  private readonly logger = new Logger(HandoutService.name);

  constructor(private repository: HandoutRepository) {}

  private readonly MIN_NAME_LENGTH = 1;
  private readonly MAX_NAME_LENGTH = 255;

  async add(data: AddHandoutDto) {
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

      const storedData = await this.repository.store(data, {
        returning: ['id', 'name', 'link', 'is_published'],
      });

      return storedData;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Add handout failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async get(
    options: {
      sort?: Partial<Record<HandoutSortKey, SortOrder>>;
      search?: string;
    } = {},
  ) {
    const data = await this.repository.find({
      select: ['id', 'name', 'link', 'is_published'],
      search: options.search,
      order: options.sort,
    });

    return data;
  }

  async getPublished(
    options: {
      sort?: Partial<Record<HandoutSortKey, SortOrder>>;
      search?: string;
    } = {},
  ) {
    const data = await this.repository.find({
      select: ['id', 'name', 'link'],
      where: { is_published: true },
      search: options.search,
      order: options.sort,
    });

    return data;
  }

  async update(id: Handout['id'], data: UpdateHandoutDto) {
    try {
      const MIN_NAME_LENGTH = this.MIN_NAME_LENGTH;
      const MAX_NAME_LENGTH = this.MAX_NAME_LENGTH;

      if (
        data.name !== undefined &&
        data.name !== null &&
        (data.name.length < MIN_NAME_LENGTH ||
          data.name.length > MAX_NAME_LENGTH)
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters`,
          ),
        );
      }

      const updateResult = await this.repository.update(id, data, {
        returning: ['id', 'name', 'link', 'is_published'],
      });

      return updateResult;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Update handout failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async delete(id: Handout['id']) {
    try {
      const deletedData = await this.repository.softDeleteById(id, {
        returning: ['id'],
      });

      return deletedData;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Delete handout failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }
}
