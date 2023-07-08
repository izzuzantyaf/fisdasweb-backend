import { Module } from '@nestjs/common';
import { OrganigramController } from './organigram.controller';
import { MongoModule } from 'src/common/database/mongodb/mongo.module';
import { OrganigramFactoryService } from './organigram-factory.service';
import { OrganigramService } from './organigram.service';

@Module({
  imports: [MongoModule],
  providers: [OrganigramService, OrganigramFactoryService],
  controllers: [OrganigramController],
  exports: [OrganigramService, OrganigramFactoryService],
})
export class OrganigramModule {}
