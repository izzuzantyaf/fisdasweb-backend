import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organigram } from 'src/organigram/entities';
import { organigramSeed } from 'src/organigram/seed';
import { FindManyOptions, Repository } from 'typeorm';

export class OrganigramRepository implements OnModuleInit {
  private logger = new Logger(OrganigramRepository.name);

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

  async store(data: Pick<Organigram, 'link' | 'is_published'>) {
    const insertResult = await this.organigramRepository
      .createQueryBuilder()
      .insert()
      .into(Organigram)
      .values({
        link: data.link,
        is_published: data.is_published,
      })
      .returning('*')
      .execute();

    const storedOrganigram = this.organigramRepository.create(
      insertResult.raw[0] as Organigram,
    );

    return storedOrganigram;
  }

  async find(options: FindManyOptions<Organigram> = {}) {
    const organigram = await this.organigramRepository.find(options);
    return organigram;
  }

  async update(
    id: Organigram['id'],
    data: Partial<Pick<Organigram, 'link' | 'is_published'>>,
    options: {
      returning?: (keyof Organigram)[];
    } = {},
  ) {
    const updateResult = await this.organigramRepository
      .createQueryBuilder()
      .update()
      .set({
        link: data.link,
        is_published: data.is_published,
      })
      .where(`id = :id`, { id })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    if (updateResult.affected === 0) {
      return null;
    }

    const updatedOrganigram = this.organigramRepository.create(
      updateResult.raw[0] as Organigram,
    );

    return updatedOrganigram;
  }
}
