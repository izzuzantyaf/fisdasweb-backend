import { Assistant } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UpdateResult } from 'src/common/database/typeorm/types';

export class AssistantRepository {
  private logger = new Logger(AssistantRepository.name);

  constructor(
    @InjectRepository(Assistant)
    private repository: Repository<Assistant>,
  ) {}

  async find({ order, ...options }: FindManyOptions<Assistant> = {}) {
    return await this.repository.find({
      order: { id: 'asc', ...order },
      ...options,
    });
  }

  async store(
    data: Pick<Assistant, 'code' | 'name'> &
      Partial<Pick<Assistant, 'line_id' | 'is_published'>>,
    options: {
      returning?: (keyof Assistant)[];
    } = {},
  ) {
    const insertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .values({
        name: data.name,
        code: data.code,
        line_id: data.line_id,
        is_published: data.is_published,
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const storedData = this.repository.create(insertResult.raw[0] as Assistant);

    return storedData;
  }

  async update(
    id: Assistant['id'],
    data: Partial<
      Pick<Assistant, 'code' | 'name' | 'line_id' | 'is_published'>
    >,
    options: {
      returning?: (keyof Assistant)[];
    } = {},
  ) {
    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set({
        name: data.name,
        code: data.code,
        line_id: data.line_id,
        is_published: data.is_published,
      })
      .where({ id: id, deleted_at: IsNull() })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const updatedData = this.repository.create(
      updateResult.raw[0] as Assistant,
    );

    if (updateResult.affected === 0) {
      updateResult.affected = 0;
    }

    return {
      result: updateResult as UpdateResult,
      updated: updatedData,
    };
  }

  async softDeleteById(
    id: Assistant['id'],
    options: {
      returning?: (keyof Assistant)[];
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

    const deletedData = this.repository.create(
      deleteResult.raw[0] as Assistant,
    );

    if (deleteResult.affected === undefined) {
      deleteResult.affected = 0;
    }

    return {
      result: deleteResult as UpdateResult,
      deleted: deletedData,
    };
  }
}
