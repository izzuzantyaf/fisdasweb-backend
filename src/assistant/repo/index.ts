import { Assistant } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreateAssistantDto, UpdateAssistantDto } from 'src/assistant/dto';

export class AssistantRepository {
  private logger = new Logger(AssistantRepository.name);

  constructor(
    @InjectRepository(Assistant)
    private assistantRepository: Repository<Assistant>,
  ) {}

  async getAll() {
    return await this.assistantRepository.find({ order: { name: 'ASC' } });
  }

  async search(keyword: string) {
    const searchResult = await this.assistantRepository.find({
      where: [{ name: ILike(`%${keyword}%`) }, { code: ILike(`%${keyword}%`) }],
    });
    return searchResult;
  }

  async deleteById(id: Assistant['id']) {
    const deleteResult = await this.assistantRepository.delete({ id });
    this.logger.debug(
      `Assistant delete result: ${JSON.stringify(deleteResult)}`,
    );
    return deleteResult;
    throw new Error('Method not implemented.');
  }

  async store(data: CreateAssistantDto) {
    const insertResult = await this.assistantRepository
      .createQueryBuilder()
      .insert()
      .into(Assistant)
      .values({
        name: data.name,
        code: data.code,
        phone: data.phone,
        line_id: data.line_id,
        gender: data.gender,
        level: data.level,
        feedback_url: data.feedback_url,
        image_url: data.image_url,
      })
      .returning('*')
      .execute();

    const storedAssistant = this.assistantRepository.create(
      insertResult.raw[0] as Assistant,
    );

    this.logger.debug(`Stored assistant: ${JSON.stringify(storedAssistant)}`);

    return storedAssistant;
  }

  async update(id: Assistant['id'], data: UpdateAssistantDto) {
    const updateResult = await this.assistantRepository
      .createQueryBuilder()
      .update()
      .set({
        name: data.name,
        code: data.code,
        phone: data.phone,
        line_id: data.line_id,
        gender: data.gender,
        level: data.level,
        feedback_url: data.feedback_url,
        image_url: data.image_url,
      })
      .where(`id = :id`, { id })
      .returning('*')
      .execute();

    const updatedAssistant = this.assistantRepository.create(
      updateResult.raw[0] as Assistant,
    );

    this.logger.debug(`Assistant updated: ${JSON.stringify(updatedAssistant)}`);

    return updatedAssistant;
    throw new Error('Method not implemented.');
  }
}
