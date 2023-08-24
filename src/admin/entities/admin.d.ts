import AdminRole from 'src/admin/constants/admin-role.constant';

export default interface IAdmin {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
