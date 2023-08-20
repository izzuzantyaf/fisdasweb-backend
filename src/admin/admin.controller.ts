import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AdminService } from 'src/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
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
