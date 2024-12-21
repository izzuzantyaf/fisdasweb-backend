import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Admin from 'src/admin/entities';
import { Repository } from 'typeorm';

export default class AdminPostgresRepository {
  private logger = new Logger(AdminPostgresRepository.name);

  constructor(@InjectRepository(Admin) private repository: Repository<Admin>) {}

  async deleteById(id: Admin['id']): Promise<any> {
    const deleteResult = await this.repository.delete({ id });
    this.logger.debug(`Admin delete result: ${JSON.stringify(deleteResult)}`);
    return deleteResult;
  }

  async checkIsExistByUsername(username: string): Promise<boolean> {
    return await this.repository.exists({ where: { username } });
  }

  async store(
    data: Pick<Admin, 'name' | 'username' | 'password'>,
  ): Promise<Admin> {
    const insertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .into(Admin)
      .values({
        name: data.name,
        username: data.username,
        password: data.password,
      })
      .returning('*')
      .execute();

    const storedData = this.repository.create(insertResult.raw[0] as Admin);

    return storedData;
  }

  get(): Promise<Admin[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: Admin['id']): Promise<Admin> {
    return await this.repository.findOneBy({ id });
  }

  async getByUsername(username: string): Promise<Admin> {
    return await this.repository.findOneBy({ username });
  }
}
