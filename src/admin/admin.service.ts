import { Injectable } from '@nestjs/common';
import Admin from 'src/admin/entities';
import AdminPostgresRepository from 'src/admin/repo';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminPostgresRepository) {}

  async getProfile(id: Admin['id']) {
    const admin = await this.adminRepository.getById(id);

    return {
      id: admin.id,
      name: admin.name,
      username: admin.username,
    };
  }
}
