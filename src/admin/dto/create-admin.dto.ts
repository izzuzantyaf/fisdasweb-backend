import { AdminRole } from 'src/admin/constants';
import IAdmin from '../entities/admin';

export class CreateAdminDto
  implements Omit<IAdmin, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
{
  name: string;
  email: string;
  password: string;
  role: AdminRole;
}
