import { Module } from '@nestjs/common';
import { CodeOfConductController } from './code-of-conduct.controller';
import { MongoModule } from 'src/common/database/mongodb/mongo.module';
import { CodeOfConductFactoryService } from './code-of-conduct-factory.service';
import { CodeOfConductService } from './code-of-conduct.service';

@Module({
  imports: [MongoModule],
  providers: [CodeOfConductService, CodeOfConductFactoryService],
  controllers: [CodeOfConductController],
  exports: [CodeOfConductService, CodeOfConductFactoryService],
})
export class CodeOfConductModule {}
