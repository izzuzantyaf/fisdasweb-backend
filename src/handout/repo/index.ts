import { InjectRepository } from '@nestjs/typeorm';
import { Handout } from 'src/handout/entities';
import { FindManyOptions, Repository } from 'typeorm';

export class HandoutRepository {
  constructor(
    @InjectRepository(Handout)
    private repository: Repository<Handout>,
  ) {}

  async store(
    data: Pick<Handout, 'name' | 'link'> &
      Partial<Pick<Handout, 'is_published'>>,
    options: {
      returning?: (keyof Handout)[];
    } = {},
  ) {
    const insertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .values({
        name: data.name,
        link: data.link,
        is_published: data.is_published,
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const storedData = this.repository.create(insertResult.raw[0] as Handout);

    return storedData;
  }

  async find({ order, ...options }: FindManyOptions<Handout> = {}) {
    const data = await this.repository.find({
      order: {
        id: 'asc',
        ...order,
      },
      ...options,
    });

    return data;
  }

  async update(
    id: Handout['id'],
    data: Partial<Pick<Handout, 'name' | 'link' | 'is_published'>>,
    options: {
      returning?: (keyof Handout)[];
    } = {},
  ) {
    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set({
        name: data.name,
        link: data.link,
        is_published: data.is_published,
      })
      .where({
        id: id,
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const updatedData = this.repository.create(updateResult.raw[0] as Handout);

    return {
      result: updateResult,
      updated: updatedData,
    };
  }

  async softDeleteById(
    id: Handout['id'],
    options: {
      returning?: (keyof Handout)[];
    } = {},
  ) {
    const deleteResult = await this.repository
      .createQueryBuilder()
      .softDelete()
      .where({
        id: id,
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const deletedData = this.repository.create(deleteResult.raw[0] as Handout);

    return {
      result: deleteResult,
      deleted: deletedData,
    };
  }
}
