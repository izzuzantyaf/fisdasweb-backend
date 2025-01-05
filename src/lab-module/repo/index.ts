import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'src/common/database/typeorm/types';
import { LabModule } from 'src/lab-module/entities';
import { Brackets, FindManyOptions, ILike, IsNull, Repository } from 'typeorm';

export class LabModuleRepository {
  private logger = new Logger(LabModuleRepository.name);

  constructor(
    @InjectRepository(LabModule)
    private repository: Repository<LabModule>,
  ) {}

  async store(
    data: Pick<LabModule, 'name' | 'code'> &
      Partial<
        Pick<
          LabModule,
          | 'pretask_link'
          | 'pretask_is_published'
          | 'video_link'
          | 'video_is_published'
          | 'simulator_link'
          | 'simulator_is_published'
          | 'journal_cover_link'
          | 'journal_cover_is_published'
        >
      >,
    options: {
      returning?: (keyof LabModule)[];
    } = {},
  ) {
    const insertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .values({
        name: data.name,
        code: data.code,
        pretask_link: data.pretask_link,
        pretask_is_published: data.pretask_is_published,
        video_link: data.video_link,
        video_is_published: data.video_is_published,
        simulator_link: data.simulator_link,
        simulator_is_published: data.simulator_is_published,
        journal_cover_link: data.journal_cover_link,
        journal_cover_is_published: data.journal_cover_is_published,
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const storedData = this.repository.create(insertResult.raw[0] as LabModule);

    return storedData;
  }

  async find({
    where,
    order,
    ...options
  }: FindManyOptions<LabModule> & { search?: string } = {}) {
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
          }).orWhere({
            code: options.search ? ILike(`%${options.search}%`) : undefined,
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

  async update(
    id: LabModule['id'],
    data: Partial<
      Pick<
        LabModule,
        | 'name'
        | 'code'
        | 'pretask_link'
        | 'pretask_is_published'
        | 'video_link'
        | 'video_is_published'
        | 'simulator_link'
        | 'simulator_is_published'
        | 'journal_cover_link'
        | 'journal_cover_is_published'
      >
    >,
    options: {
      returning?: (keyof LabModule)[];
    } = {},
  ) {
    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set({
        name: data.name,
        code: data.code,
        pretask_link: data.pretask_link,
        pretask_is_published: data.pretask_is_published,
        video_link: data.video_link,
        video_is_published: data.video_is_published,
        simulator_link: data.simulator_link,
        simulator_is_published: data.simulator_is_published,
        journal_cover_link: data.journal_cover_link,
        journal_cover_is_published: data.journal_cover_is_published,
      })
      .where({
        id: id,
        deleted_at: IsNull(),
      })
      .returning(options?.returning?.join(', ') || '*')
      .execute();

    const updatedData = this.repository.create(
      updateResult.raw[0] as LabModule,
    );

    if (updateResult.affected === undefined) {
      updateResult.affected = 0;
    }

    return {
      result: updateResult,
      updated: updatedData,
    };
  }

  async softDeleteById(
    id: LabModule['id'],
    options: {
      returning?: (keyof LabModule)[];
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
      deleteResult.raw[0] as LabModule,
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
