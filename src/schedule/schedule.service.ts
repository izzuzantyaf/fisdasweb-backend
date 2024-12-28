import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { AddScheduleDto, UpdateScheduleDto } from 'src/schedule/dto';
import { Schedule } from 'src/schedule/entities';
import { ScheduleRepository } from 'src/schedule/repo';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private repository: ScheduleRepository) {}

  private readonly MIN_NAME_LENGTH = 1;
  private readonly MAX_NAME_LENGTH = 255;

  async add(data: AddScheduleDto) {
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
          event: 'Add schedule failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async get() {
    const data = await this.repository.find({
      select: ['id', 'name', 'link', 'is_published'],
    });

    return data;
  }

  async getPublished() {
    const data = await this.repository.find({
      select: ['id', 'name', 'link'],
      where: { is_published: true },
    });

    return data;
  }

  async update(id: Schedule['id'], data: UpdateScheduleDto) {
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
          event: 'Update schedule failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async delete(id: Schedule['id']) {
    try {
      const deletedData = await this.repository.softDeleteById(id, {
        returning: ['id'],
      });

      return deletedData;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Delete schedule failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }
}
