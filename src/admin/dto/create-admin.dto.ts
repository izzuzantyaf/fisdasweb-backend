import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from 'src/admin/constants';

export class CreateAdminDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: AdminRole;
}
