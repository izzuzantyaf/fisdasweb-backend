import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { Admin, AdminSchema } from 'src/domains/admin/entities/admin.entity';
import {
  Handout,
  HandoutSchema,
} from 'src/domains/handout/entities/handout.entity';
import {
  CodeOfConduct,
  CodeOfConductSchema,
} from 'src/domains/code-of-conduct/entities/code-of-conduct.entity';
import {
  Organigram,
  OrganigramSchema,
} from 'src/domains/organigram/entities/organigram.entity';
import {
  Schedule,
  ScheduleSchema,
} from 'src/domains/schedule/entities/schedule.entity';
import {
  Assistant,
  AssistantSchema,
} from 'src/domains/assistant/entities/assistant.entity';
import {
  PracticumModule,
  PracticumModuleSchema,
} from 'src/domains/practicum-module/entities/practicum-module.entity';
import {
  SocialMedia,
  SocialMediaSchema,
} from 'src/domains/social-media/entities/social-media.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Handout.name, schema: HandoutSchema },
      { name: CodeOfConduct.name, schema: CodeOfConductSchema },
      { name: Organigram.name, schema: OrganigramSchema },
      { name: Schedule.name, schema: ScheduleSchema },
      { name: Assistant.name, schema: AssistantSchema },
      { name: PracticumModule.name, schema: PracticumModuleSchema },
      { name: SocialMedia.name, schema: SocialMediaSchema },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
