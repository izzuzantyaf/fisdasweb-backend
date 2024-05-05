import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongoModule } from 'src/common/database/mongodb/mongo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Admin from 'src/admin/entity';
import AdminPostgresRepository from 'src/admin/repo';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminPostgresRepository],
  exports: [AdminService, AdminPostgresRepository],
})
export class AdminModule {}
