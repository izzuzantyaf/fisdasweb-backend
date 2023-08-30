import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateOrganigramDto from 'src/organigram/dto/create-organigram.dto';
import UpdateOrganigramDto from 'src/organigram/dto/update-organigram.dto';
import { Organigram } from 'src/organigram/entities/organigram.entity';
import IOrganigramRepository from 'src/organigram/repo/organigram.repo';
import { Repository } from 'typeorm';

export default class OrganigramPostgresRepository
  implements IOrganigramRepository
{
  private logger = new Logger(OrganigramPostgresRepository.name);

  constructor(
    @InjectRepository(Organigram)
    private organigramRepository: Repository<Organigram>,
  ) {}

  async store(organigram: CreateOrganigramDto): Promise<Organigram> {
    const insertResult = await this.organigramRepository
      .createQueryBuilder()
      .insert()
      .into(Organigram)
      .values(organigram)
      .returning('*')
      .execute();
    const storedOrganigram = this.organigramRepository.create(
      insertResult.raw[0] as Organigram,
    );
    this.logger.debug(`Stored organigram: ${JSON.stringify(storedOrganigram)}`);
    return storedOrganigram;
    throw new Error('Method not implemented.');
  }

  async get(): Promise<Organigram[]> {
    const organigram = await this.organigramRepository.find();
    return organigram;
    throw new Error('Method not implemented.');
  }

  async updateById(
    id: Organigram['id'],
    organigram: UpdateOrganigramDto,
  ): Promise<Organigram> {
    const updateResult = await this.organigramRepository
      .createQueryBuilder()
      .update()
      .set(organigram)
      .where(`id = :id`, { id })
      .returning('*')
      .execute();
    const updatedOrganigram = this.organigramRepository.create(
      updateResult.raw[0] as Organigram,
    );
    this.logger.debug(
      `Updated organigram: ${JSON.stringify(updatedOrganigram)}`,
    );
    return updatedOrganigram;
    throw new Error('Method not implemented.');
  }
}
