import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Admin from 'src/admin/entities';
import { Repository } from 'typeorm';

export default class AdminPostgresRepository {
  private logger = new Logger(AdminPostgresRepository.name);

  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async deleteById(id: Admin['id']): Promise<any> {
    const deleteResult = await this.adminRepository.delete({ id });
    this.logger.debug(`Admin delete result: ${JSON.stringify(deleteResult)}`);
    return deleteResult;
    throw new Error('Method not implemented.');
  }

  async checkIsExistByUsername(username: string): Promise<boolean> {
    return await this.adminRepository.exists({ where: { username } });
    throw new Error('Method not implemented.');
  }

  async store(
    admin: Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
  ): Promise<Admin> {
    const insertResult = await this.adminRepository
      .createQueryBuilder()
      .insert()
      .into(Admin)
      .values(admin)
      .returning('*')
      .execute();
    const storedAdmin = this.adminRepository.create(
      insertResult.raw[0] as Admin,
    );
    this.logger.debug(`Stored admin: ${JSON.stringify(storedAdmin)}`);
    return storedAdmin;
  }

  get(): Promise<Admin[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: Admin['id']): Promise<Admin> {
    return await this.adminRepository.findOneBy({ id });
    throw new Error('Method not implemented.');
  }

  async getByUsername(username: string): Promise<Admin> {
    return await this.adminRepository.findOneBy({ username });
    throw new Error('Method not implemented.');
  }
}
