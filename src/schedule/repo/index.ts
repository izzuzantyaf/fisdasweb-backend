import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'src/common/database/typeorm/types';
import { Schedule } from 'src/schedule/entities';
import { FindManyOptions, ILike, IsNull, Repository } from 'typeorm';

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

  async find({
    where,
    order,
    ...options
  }: FindManyOptions<Schedule> & { search?: string } = {}) {
    const data = await this.repository.find({
      where: {
        name: options.search ? ILike(`%${options.search}%`) : undefined,
        ...where,
      },
      order: {
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
        deleted_at: IsNull(),
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const updatedData = this.repository.create(updateResult.raw[0] as Schedule);

    if (updateResult.affected === undefined) {
      updateResult.affected = 0;
    }

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
        deleted_at: IsNull(),
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const deletedData = this.repository.create(deleteResult.raw[0] as Schedule);

    if (deleteResult.affected === undefined) {
      deleteResult.affected = 0;
    }

    return {
      result: deleteResult as UpdateResult,
      deleted: deletedData,
    };
  }
}
