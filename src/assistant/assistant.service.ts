import { BadRequestException, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { CreateAssistantDto, UpdateAssistantDto } from 'src/assistant/dto';
import { Logger } from '@nestjs/common/services';
import { CreateAssistantValidationHelper } from 'src/assistant/helpers';
import { AssistantRepository } from 'src/assistant/repo';
import { Assistant } from 'src/assistant/entities';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);

  constructor(private assistantRepository: AssistantRepository) {}

  async create(dto: CreateAssistantDto) {
    this.logger.debug(`createAssistantDto ${JSON.stringify(dto)}`);

    const validationErrors = new CreateAssistantValidationHelper(
      dto,
    ).validateProps();

    if (isNotEmpty(validationErrors)) {
      this.logger.debug(
        `Assistant data is not valid ${JSON.stringify(validationErrors)}`,
      );
      throw new BadRequestException(
        new ErrorResponseDto('Data tidak valid', validationErrors),
      );
    }

    const storedAssistant = await this.assistantRepository.store(dto);

    return storedAssistant;
  }

  async getAll() {
    const assistants = await this.assistantRepository.getAll();
    return assistants;
  }

  async search(keyword: string) {
    keyword = keyword.trim();
    const searchResult = await this.assistantRepository.search(keyword);
    return searchResult;
  }

  async update(id: Assistant['id'], dto: UpdateAssistantDto) {
    this.logger.debug(`updateAssistantDto ${JSON.stringify(dto)}`);

    const validationErrors = new CreateAssistantValidationHelper(
      dto,
    ).validateProps();

    if (isNotEmpty(validationErrors)) {
      this.logger.debug(
        `Assistant data is not valid ${JSON.stringify(validationErrors)}`,
      );
      throw new BadRequestException(
        new ErrorResponseDto('Data tidak valid', { errors: validationErrors }),
      );
    }

    const updatedAssistant = await this.assistantRepository.update(id, dto);

    return updatedAssistant;
  }

  async delete(id: Assistant['id']) {
    const deletedAssistant = await this.assistantRepository.deleteById(id);
    return deletedAssistant;
  }
}
