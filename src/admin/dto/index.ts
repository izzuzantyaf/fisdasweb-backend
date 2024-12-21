import Admin from '../entities';

export class CreateAdminDto
  implements Omit<Admin, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
{
  name: Admin['name'];
  email: Admin['email'];
  password: Admin['password'];
}
