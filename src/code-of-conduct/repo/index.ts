import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeOfConduct } from 'src/code-of-conduct/entities';
import { codeOfConductSeed } from 'src/code-of-conduct/seed';
import { FindManyOptions, Repository } from 'typeorm';

export class CodeOfConductRepository implements OnModuleInit {
  private logger = new Logger(CodeOfConductRepository.name);

  constructor(
    @InjectRepository(CodeOfConduct)
    private codeOfConductRepository: Repository<CodeOfConduct>,
  ) {}

  onModuleInit() {
    // this.seed();
  }

  private async seed() {
    const count = await this.codeOfConductRepository
      .createQueryBuilder()
      .getCount();

    if (count === 0) {
      await this.store(codeOfConductSeed[0]);
      this.logger.log(`CodeOfConduct seeded successfully`);
    }
  }

  async store(data: Pick<CodeOfConduct, 'link' | 'is_published'>) {
    const insertResult = await this.codeOfConductRepository
      .createQueryBuilder()
      .insert()
      .into(CodeOfConduct)
      .values({
        link: data.link,
        is_published: data.is_published,
      })
      .returning('*')
      .execute();

    const storedCodeOfConduct = this.codeOfConductRepository.create(
      insertResult.raw[0] as CodeOfConduct,
    );

    return storedCodeOfConduct;
  }

  async find(options: FindManyOptions<CodeOfConduct> = {}) {
    const codeOfConduct = await this.codeOfConductRepository.find(options);
    return codeOfConduct;
  }

  async update(
    id: CodeOfConduct['id'],
    data: Partial<Pick<CodeOfConduct, 'link' | 'is_published'>>,
    options: {
      returning?: (keyof CodeOfConduct)[];
    } = {},
  ) {
    const updateResult = await this.codeOfConductRepository
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

    const updatedCodeOfConduct = this.codeOfConductRepository.create(
      updateResult.raw[0] as CodeOfConduct,
    );

    return updatedCodeOfConduct;
  }
}
