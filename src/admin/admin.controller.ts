import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AdminService } from 'src/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
