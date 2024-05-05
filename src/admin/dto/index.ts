import { AdminRole } from 'src/admin/constant';
import Admin from '../entity';

export class CreateAdminDto
  implements Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
{
  name: Admin['name'];
  email: Admin['email'];
  password: Admin['password'];
  role: AdminRole;
}
