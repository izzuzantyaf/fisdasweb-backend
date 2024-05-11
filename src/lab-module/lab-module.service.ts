import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { UpdateLabModuleDto } from 'src/lab-module/dto';
import { LabModule } from 'src/lab-module/entities';
import { UpdateLabModuleValidationHelper } from 'src/lab-module/helpers';
import { LabModuleRepository } from 'src/lab-module/repo';

@Injectable()
export class LabModuleService {
  private logger = new Logger(LabModuleService.name);

  constructor(private labModuleRepository: LabModuleRepository) {}

  async getAll() {
    return await this.labModuleRepository.find();
  }

  async getPreTasks() {
    return await this.labModuleRepository.getPretask();
  }

  async getVideos() {
    return await this.labModuleRepository.getVideo();
  }

  async getSimulators() {
    return await this.labModuleRepository.getSimulator();
  }

  async getJournalCovers() {
    return await this.labModuleRepository.getJournalCover();
  }

  async update(id: LabModule['id'], data: UpdateLabModuleDto) {
    this.logger.debug(`update lab module dto: ${JSON.stringify(data)}`);

    const validationError = new UpdateLabModuleValidationHelper(
      data,
    ).validateProps();

    if (isNotEmpty(validationError)) {
      this.logger.debug(
        `lab module data is not valid ${JSON.stringify(validationError)}`,
      );

      throw new BadRequestException(
        new ErrorResponseDto('Data tidak valid', validationError),
      );
    }

    const updatedLabModule = await this.labModuleRepository.update(id, data);

    return updatedLabModule;
  }
}
