import { Module } from '@nestjs/common';
import { AssistantController } from './assistant.controller';
import { MongoModule } from 'src/common/database/mongodb/mongo.module';
import { AssistantFactoryService } from './assistant-factory.service';
import { AssistantService } from './assistant.service';

@Module({
  imports: [MongoModule],
  providers: [AssistantService, AssistantFactoryService],
  controllers: [AssistantController],
  exports: [AssistantService, AssistantFactoryService],
})
export class AssistantModule {}
