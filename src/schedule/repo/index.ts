import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/schedule/entities';
import { FindManyOptions, Repository } from 'typeorm';

export class ScheduleRepository {
  constructor(
    @InjectRepository(Schedule)
    private repository: Repository<Schedule>,
  ) {}

  async store(
    data: Pick<Schedule, 'name' | 'link'> &
      Partial<Pick<Schedule, 'is_published'>>,
    options: {
      returning?: (keyof Schedule)[];
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

    const storedData = this.repository.create(insertResult.raw[0] as Schedule);

    return storedData;
  }

  async find({ order, ...options }: FindManyOptions<Schedule> = {}) {
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
    id: Schedule['id'],
    data: Partial<Pick<Schedule, 'name' | 'link' | 'is_published'>>,
    options: {
      returning?: (keyof Schedule)[];
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

    const updatedData = this.repository.create(updateResult.raw[0] as Schedule);

    return {
      result: updateResult,
      updated: updatedData,
    };
  }

  async softDeleteById(
    id: Schedule['id'],
    options: {
      returning?: (keyof Schedule)[];
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

    const deletedData = this.repository.create(deleteResult.raw[0] as Schedule);

    return {
      result: deleteResult,
      deleted: deletedData,
    };
  }
}
