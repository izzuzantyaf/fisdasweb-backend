import { Module } from '@nestjs/common';
import { OrganigramController } from './organigram.controller';
import { MongoModule } from 'src/common/database/mongodb/mongo.module';
import { OrganigramService } from './organigram.service';
import { Organigram } from 'src/organigram/entities/organigram.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganigramPostgresRepository } from 'src/organigram/repo';

@Module({
  imports: [MongoModule, TypeOrmModule.forFeature([Organigram])],
  providers: [OrganigramService, OrganigramPostgresRepository],
  controllers: [OrganigramController],
  exports: [OrganigramService, OrganigramPostgresRepository],
})
export class OrganigramModule {}
