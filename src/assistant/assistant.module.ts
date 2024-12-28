import { Module } from '@nestjs/common';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { AssistantRepository } from 'src/assistant/repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assistant } from 'src/assistant/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Assistant])],
  providers: [AssistantService, AssistantRepository],
  controllers: [AssistantController],
  exports: [AssistantService, AssistantRepository],
})
export class AssistantModule {}
