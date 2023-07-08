import { Module } from '@nestjs/common';
import { HandoutController } from './handout.controller';
import { MongoModule } from 'src/common/database/mongodb/mongo.module';
import { HandoutFactoryService } from './handout-factory.service';
import { HandoutService } from './handout.service';

@Module({
  imports: [MongoModule],
  providers: [HandoutService, HandoutFactoryService],
  controllers: [HandoutController],
  exports: [HandoutService, HandoutFactoryService],
})
export class HandoutModule {}
