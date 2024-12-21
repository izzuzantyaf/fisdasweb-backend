import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organigram } from 'src/organigram/entities';
import { OrganigramController } from 'src/organigram/organigram.controller';
import { OrganigramService } from 'src/organigram/organigram.service';
import { OrganigramRepository } from 'src/organigram/repo';

@Module({
  imports: [TypeOrmModule.forFeature([Organigram])],
  providers: [OrganigramService, OrganigramRepository],
  controllers: [OrganigramController],
  exports: [OrganigramService, OrganigramRepository],
})
export class OrganigramModule {}
