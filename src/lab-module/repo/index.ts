import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabModule } from 'src/lab-module/entities';
import { labModuleSeed } from 'src/lab-module/seed';
import { AddLabModuleParam, UpdateLabModuleParam } from 'src/lab-module/types';
import { Repository } from 'typeorm';

export class LabModuleRepository implements OnModuleInit {
  private logger = new Logger(LabModuleRepository.name);

  constructor(
    @InjectRepository(LabModule)
    private labModuleRepository: Repository<LabModule>,
  ) {}

  onModuleInit() {
    this.seed();
  }

  private async seed() {
    const count = await this.labModuleRepository
      .createQueryBuilder()
      .getCount();

    if (count === 0) {
      await this.storeMany(labModuleSeed);
      this.logger.log('Lab module seeded successfully');
    }
  }

  private createAddLabModuleParam(
    data: Record<string, any>,
  ): AddLabModuleParam {
    return {
      name: data.name,
      code: data.code,
      language: data.language,
      pretask_url: data.pretask_url,
      is_pretask_visible: data.is_pretask_visible,
      video_url: data.video_url,
      is_video_visible: data.is_video_visible,
      simulator_url: data.simulator_url,
      is_simulator_visible: data.is_simulator_visible,
      journal_cover_url: data.journal_cover_url,
      is_journal_cover_visible: data.is_journal_cover_visible,
    };
  }

  async store(data: AddLabModuleParam) {
    const insertResult = await this.labModuleRepository
      .createQueryBuilder()
      .insert()
      .into(LabModule)
      .values(this.createAddLabModuleParam(data))
      .returning('*')
      .execute();

    const storedLabModule = this.labModuleRepository.create(
      insertResult.raw[0] as LabModule,
    );

    this.logger.debug(`Stored lab module: ${JSON.stringify(storedLabModule)}`);

    return storedLabModule;
  }

  async storeMany(data: AddLabModuleParam[]) {
    const insertResult = await this.labModuleRepository
      .createQueryBuilder()
      .insert()
      .into(LabModule)
      .values(data.map((entry) => this.createAddLabModuleParam(entry)))
      .returning('*')
      .execute();

    const storedLabModule = this.labModuleRepository.create(
      insertResult.raw as LabModule[],
    );

    this.logger.debug(`Stored lab module: ${JSON.stringify(storedLabModule)}`);

    return storedLabModule;
  }

  async find() {
    return await this.labModuleRepository.find({
      order: { code: 'ASC', language: 'ASC' },
    });
  }

  async getPretask() {
    return await this.labModuleRepository.find({
      select: [
        'id',
        'name',
        'code',
        'language',
        'pretask_url',
        'is_pretask_visible',
        'created_at',
        'updated_at',
      ],
      where: { is_pretask_visible: true },
      order: { code: 'ASC', language: 'ASC' },
    });
  }

  async getVideo() {
    return await this.labModuleRepository.find({
      select: [
        'id',
        'name',
        'code',
        'language',
        'video_url',
        'is_video_visible',
        'created_at',
        'updated_at',
      ],
      where: { is_video_visible: true },
      order: { code: 'ASC', language: 'ASC' },
    });
  }

  async getSimulator() {
    return await this.labModuleRepository.find({
      select: [
        'id',
        'name',
        'code',
        'language',
        'simulator_url',
        'is_simulator_visible',
        'created_at',
        'updated_at',
      ],
      where: { is_simulator_visible: true },
      order: { code: 'ASC', language: 'ASC' },
    });
  }

  async getJournalCover() {
    return await this.labModuleRepository.find({
      select: [
        'id',
        'name',
        'code',
        'language',
        'journal_cover_url',
        'is_journal_cover_visible',
        'created_at',
        'updated_at',
      ],
      where: { is_journal_cover_visible: true },
      order: { code: 'ASC', language: 'ASC' },
    });
  }

  private createUpdateLabModuleParam(
    data: Record<string, any>,
  ): UpdateLabModuleParam {
    return {
      name: data.name,
      code: data.code,
      language: data.language,
      pretask_url: data.pretask_url,
      is_pretask_visible: data.is_pretask_visible,
      video_url: data.video_url,
      is_video_visible: data.is_video_visible,
      simulator_url: data.simulator_url,
      is_simulator_visible: data.is_simulator_visible,
      journal_cover_url: data.journal_cover_url,
      is_journal_cover_visible: data.is_journal_cover_visible,
    };
  }

  async update(id: LabModule['id'], data: UpdateLabModuleParam) {
    const updateResult = await this.labModuleRepository
      .createQueryBuilder()
      .update()
      .set(this.createUpdateLabModuleParam(data))
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const updatedLabModule = this.labModuleRepository.create(
      updateResult.raw[0] as LabModule,
    );

    this.logger.debug(
      `Lab module updated: ${JSON.stringify(updatedLabModule)}`,
    );

    return updatedLabModule;
  }
}
