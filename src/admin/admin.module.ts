import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongoModule } from 'src/common/database/mongodb/mongo.module';
import { AdminFactoryService } from './admin-factory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import AdminPostgresRepository from 'src/admin/repo/admin-postgres.repo';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService, AdminPostgresRepository],
  exports: [AdminService, AdminFactoryService, AdminPostgresRepository],
})
export class AdminModule {}
