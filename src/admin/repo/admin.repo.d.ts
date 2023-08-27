import Admin from 'src/admin/entities/admin.entity';

export default interface IAdminRepository {
  store(
    admin: Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
  ): Promise<Admin>;
  get(): Promise<Admin[]>;
  getById(id: Admin['id']): Promise<Admin>;
  getByEmail(email: Admin['email']): Promise<Admin>;
  checkIsExistByEmail(email: Admin['email']): Promise<boolean>;
  deleteById(id: Admin['id']): Promise<any>;
}
