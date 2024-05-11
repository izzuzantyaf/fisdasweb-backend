import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeOfConduct } from 'src/code-of-conduct/entities';
import { codeOfConductSeed } from 'src/code-of-conduct/seed';
import { Repository } from 'typeorm';

export class CodeOfConductRepository implements OnModuleInit {
  private logger = new Logger(CodeOfConductRepository.name);

  constructor(
    @InjectRepository(CodeOfConduct)
    private codeOfConductRepository: Repository<CodeOfConduct>,
  ) {}

  onModuleInit() {
    this.seed();
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

  async store(data: Pick<CodeOfConduct, 'url'>) {
    const insertResult = await this.codeOfConductRepository
      .createQueryBuilder()
      .insert()
      .into(CodeOfConduct)
      .values({
        url: data.url,
      })
      .returning('*')
      .execute();
    const storedCodeOfConduct = this.codeOfConductRepository.create(
      insertResult.raw[0] as CodeOfConduct,
    );
    this.logger.debug(
      `CodeOfConduct created: ${JSON.stringify(storedCodeOfConduct)}`,
    );
    return storedCodeOfConduct;
    throw new Error('Method not implemented.');
  }

  async find() {
    const codeOfConduct = await this.codeOfConductRepository.find();
    return codeOfConduct;
    throw new Error('Method not implemented.');
  }

  async update(id: CodeOfConduct['id'], data: Pick<CodeOfConduct, 'url'>) {
    const updateResult = await this.codeOfConductRepository
      .createQueryBuilder()
      .update()
      .set({
        url: data.url,
      })
      .where(`id = :id`, { id })
      .returning('*')
      .execute();
    const updatedCodeOfConduct = this.codeOfConductRepository.create(
      updateResult.raw[0] as CodeOfConduct,
    );
    this.logger.debug(
      `CodeOfConduct updated: ${JSON.stringify(updatedCodeOfConduct)}`,
    );
    return updatedCodeOfConduct;
    throw new Error('Method not implemented.');
  }
}
