import { Module } from '@nestjs/common';
import { PracticumModuleService } from './practicum-module.service';
import { PracticumModuleController } from './practicum-module.controller';
import { PracticumModuleFactory } from './practicum-module-factory.service';
import { MongoModule } from 'src/infrastructure/database/mongodb/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [PracticumModuleService, PracticumModuleFactory],
  controllers: [PracticumModuleController],
})
export class PracticumModuleModule {}
