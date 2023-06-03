import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { MongoModule } from 'src/infrastructure/database/mongodb/mongo.module';
import { ScheduleFactoryService } from './schedule-factory.service';
import { ScheduleService } from './schedule.service';

@Module({
  providers: [ScheduleService, ScheduleFactoryService],
  imports: [MongoModule],
  controllers: [ScheduleController],
  exports: [ScheduleService, ScheduleFactoryService],
})
export class ScheduleModule {}
