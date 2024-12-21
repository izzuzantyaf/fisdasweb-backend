import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Admin from 'src/admin/entities';
import AdminPostgresRepository from 'src/admin/repo';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminPostgresRepository],
  exports: [AdminService, AdminPostgresRepository],
})
export class AdminModule {}
