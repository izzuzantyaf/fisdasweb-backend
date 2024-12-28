import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { LabModule } from 'src/lab-module/entities';
import { LabModuleRepository } from 'src/lab-module/repo';

@Injectable()
export class LabModuleService {
  private logger = new Logger(LabModuleService.name);

  constructor(private labModuleRepository: LabModuleRepository) {}

  private readonly MIN_NAME_LENGTH = 1;
  private readonly MAX_NAME_LENGTH = 255;

  private readonly MIN_CODE_LENGTH = 1;
  private readonly MAX_CODE_LENGTH = 8;

  async add(
    data: Pick<LabModule, 'name' | 'code'> &
      Partial<
        Pick<
          LabModule,
          | 'pretask_link'
          | 'pretask_is_published'
          | 'video_link'
          | 'video_is_published'
          | 'simulator_link'
          | 'simulator_is_published'
          | 'journal_cover_link'
          | 'journal_cover_is_published'
        >
      >,
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

      const storedData = await this.labModuleRepository.store(data, {
        returning: [
          'id',
          'name',
          'code',
          'pretask_link',
          'pretask_is_published',
          'video_link',
          'video_is_published',
          'simulator_link',
          'simulator_is_published',
          'journal_cover_link',
          'journal_cover_is_published',
        ],
      });

      return storedData;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Add Lab Module failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async get() {
    return await this.labModuleRepository.find({
      select: [
        'id',
        'name',
        'code',
        'pretask_link',
        'pretask_is_published',
        'video_link',
        'video_is_published',
        'simulator_link',
        'simulator_is_published',
        'journal_cover_link',
        'journal_cover_is_published',
      ],
    });
  }

  async getPretaskPublished() {
    return await this.labModuleRepository.find({
      select: ['id', 'name', 'code', 'pretask_link'],
      where: { pretask_is_published: true },
    });
  }

  async getVideoPublished() {
    return await this.labModuleRepository.find({
      select: ['id', 'name', 'code', 'video_link'],
      where: { video_is_published: true },
    });
  }

  async getSimulatorPublished() {
    return await this.labModuleRepository.find({
      select: ['id', 'name', 'code', 'simulator_link'],
      where: { simulator_is_published: true },
    });
  }

  async getJournalCoverPublished() {
    return await this.labModuleRepository.find({
      select: ['id', 'name', 'code', 'journal_cover_link'],
      where: { journal_cover_is_published: true },
    });
  }

  async update(
    id: LabModule['id'],
    data: Partial<
      Pick<
        LabModule,
        | 'name'
        | 'code'
        | 'pretask_link'
        | 'pretask_is_published'
        | 'video_link'
        | 'video_is_published'
        | 'simulator_link'
        | 'simulator_is_published'
        | 'journal_cover_link'
        | 'journal_cover_is_published'
      >
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

      const updateResult = await this.labModuleRepository.update(id, data, {
        returning: [
          'id',
          'name',
          'code',
          'pretask_link',
          'pretask_is_published',
          'video_link',
          'video_is_published',
          'simulator_link',
          'simulator_is_published',
          'journal_cover_link',
          'journal_cover_is_published',
        ],
      });

      return updateResult;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Update Lab Module failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async delete(id: LabModule['id']) {
    try {
      const deletedData = await this.labModuleRepository.softDeleteById(id, {
        returning: ['id'],
      });

      return deletedData;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Delete Lab Module failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }
}
