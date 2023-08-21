import IAdmin from 'src/admin/entities/admin';

export default interface IAdminRepository {
  store(
    admin: Omit<IAdmin, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>,
  ): Promise<IAdmin>;
  get(): Promise<IAdmin[]>;
  getById(id: IAdmin['id']): Promise<IAdmin>;
  getByEmail(email: IAdmin['email']): Promise<IAdmin>;
  checkIsExistByEmail(email: IAdmin['email']): Promise<boolean>;
}
