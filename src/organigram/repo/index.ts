import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganigramDto, UpdateOrganigramDto } from 'src/organigram/dto';
import { Organigram } from 'src/organigram/entities';
import { organigramSeed } from 'src/organigram/seed';
import { Repository } from 'typeorm';

export class OrganigramPostgresRepository implements OnModuleInit {
  private logger = new Logger(OrganigramPostgresRepository.name);

  constructor(
    @InjectRepository(Organigram)
    private organigramRepository: Repository<Organigram>,
  ) {}

  onModuleInit() {
    this.seed();
  }

  private async seed() {
    const count = await this.organigramRepository
      .createQueryBuilder()
      .getCount();

    if (count === 0) {
      await this.store(organigramSeed[0]);
      this.logger.log(`Organigram seeded successfully`);
    }
  }

  async store(data: CreateOrganigramDto) {
    const insertResult = await this.organigramRepository
      .createQueryBuilder()
      .insert()
      .into(Organigram)
      .values(data)
      .returning('*')
      .execute();
    const storedOrganigram = this.organigramRepository.create(
      insertResult.raw[0] as Organigram,
    );
    this.logger.debug(
      `Organigram created: ${JSON.stringify(storedOrganigram)}`,
    );
    return storedOrganigram;
    throw new Error('Method not implemented.');
  }

  async find() {
    const organigram = await this.organigramRepository.find();
    return organigram;
    throw new Error('Method not implemented.');
  }

  async update(id: Organigram['id'], data: UpdateOrganigramDto) {
    const updateResult = await this.organigramRepository
      .createQueryBuilder()
      .update()
      .set({
        url: data.url,
      })
      .where(`id = :id`, { id })
      .returning('*')
      .execute();
    const updatedOrganigram = this.organigramRepository.create(
      updateResult.raw[0] as Organigram,
    );
    this.logger.debug(
      `Organigram updated: ${JSON.stringify(updatedOrganigram)}`,
    );
    return updatedOrganigram;
    throw new Error('Method not implemented.');
  }
}
