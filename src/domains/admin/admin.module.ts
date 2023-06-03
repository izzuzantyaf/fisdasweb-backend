import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongoModule } from 'src/infrastructure/database/mongodb/mongo.module';
import { AdminFactoryService } from './admin-factory.service';

@Module({
  imports: [MongoModule],
  controllers: [AdminController],
  providers: [AdminService, AdminFactoryService],
  exports: [AdminService, AdminFactoryService],
})
export class AdminModule {}
