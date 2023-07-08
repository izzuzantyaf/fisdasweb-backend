import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AdminRole } from 'src/admin/constants';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';

const fakeAdmin = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  password: 'helloworld',
  role: AdminRole.OWNER,
};
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiBody({
    type: CreateAdminDto,
    description: 'Menambahkan admin baru',
    examples: {
      owner: {
        summary: 'Admin dengan role owner',
        value: fakeAdmin,
      },
      admin: {
        summary: 'Admin dengan role admin',
        value: {
          ...fakeAdmin,
          role: AdminRole.ADMIN,
        },
      },
    },
  })
  @ApiCreatedResponse({ type: Admin })
  async create(@Body() createAdminDto: CreateAdminDto) {
    const storedAdmin = await this.adminService.create(createAdminDto);
    return new SuccessfulResponseDto('Registrasi berhasil', storedAdmin);
  }

  @Get()
  async getAll() {
    const admins = await this.adminService.getAll();
    return new SuccessfulResponseDto('Sukses', admins);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.adminService.delete(id);
    return new SuccessfulResponseDto('Akun berhasil dihapus');
  }
}
