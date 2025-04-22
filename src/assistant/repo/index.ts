import { Assistant } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, FindManyOptions, ILike, IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UpdateResult } from 'src/common/database/typeorm/types';

export class AssistantRepository {
  private logger = new Logger(AssistantRepository.name);

  constructor(
    @InjectRepository(Assistant)
    private repository: Repository<Assistant>,
  ) {}

  async find({
    where,
    order,
    ...options
  }: FindManyOptions<Assistant> & { search?: string } = {}) {
    const qb = this.repository
      .createQueryBuilder()
      .select(options.select as string[]);

    if (where) {
      for (const key in where) {
        qb.andWhere({ [key]: where[key] });
      }
    }

    if (options.search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where({
            name: options.search ? ILike(`%${options.search}%`) : undefined,
          })
            .orWhere({
              code: options.search ? ILike(`%${options.search}%`) : undefined,
            })
            .orWhere({
              line_id: options.search
                ? ILike(`%${options.search}%`)
                : undefined,
            });
        }),
      );
    }

    if (order) {
      for (const key in order) {
        qb.addOrderBy(
          key,
          order[key]?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
        );
      }
    }

    const data = await qb.execute();

    return data;
  }

  async store(
    data: Pick<Assistant, 'code' | 'name' | 'level'> &
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
        level: data.level,
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
      Pick<Assistant, 'code' | 'name' | 'level' | 'line_id' | 'is_published'>
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
        level: data.level,
        line_id: data.line_id,
        is_published: data.is_published,
      })
      .where({ id: id, deleted_at: IsNull() })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const updatedData = this.repository.create(
      updateResult.raw[0] as Assistant,
    );

    if (updateResult.affected === undefined) {
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
