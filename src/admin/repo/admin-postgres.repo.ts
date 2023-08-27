import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IAdmin from 'src/admin/entities/admin';
import { Admin } from 'src/admin/entities/admin.entity';
import IAdminRepository from 'src/admin/repo/admin.repo';
import { Repository } from 'typeorm';

export default class AdminPostgresRepository implements IAdminRepository {
  private logger = new Logger(AdminPostgresRepository.name);

  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async deleteById(id: string): Promise<any> {
    const deleteResult = await this.adminRepository.delete({ id });
    this.logger.debug(`Admin delete result: ${JSON.stringify(deleteResult)}`);
    return deleteResult;
    throw new Error('Method not implemented.');
  }

  async checkIsExistByEmail(email: string): Promise<boolean> {
    return await this.adminRepository.exist({ where: { email } });
    throw new Error('Method not implemented.');
  }

  async store(
    admin: Omit<IAdmin, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
  ): Promise<IAdmin> {
    const insertResult = await this.adminRepository
      .createQueryBuilder()
      .insert()
      .into(Admin)
      .values(admin)
      .returning('*')
      .execute();
    const storedAdmin = this.adminRepository.create(
      insertResult.raw[0] as IAdmin,
    );
    this.logger.debug(`Stored admin: ${JSON.stringify(storedAdmin)}`);
    return storedAdmin;
  }

  get(): Promise<IAdmin[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<IAdmin> {
    return await this.adminRepository.findOneBy({ id });
    throw new Error('Method not implemented.');
  }

  async getByEmail(email: string): Promise<IAdmin> {
    return await this.adminRepository.findOneBy({ email });
    throw new Error('Method not implemented.');
  }
}
