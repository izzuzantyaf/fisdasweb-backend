import Admin from '../entities';

export class CreateAdminDto {
  name: Admin['name'];
  username: Admin['username'];
  password: Admin['password'];
}
