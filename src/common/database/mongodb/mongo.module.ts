import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { Handout, HandoutSchema } from 'src/handout/entities/handout.entity';
import {
  Schedule,
  ScheduleSchema,
} from 'src/schedule/entities/schedule.entity';
import {
  SocialMedia,
  SocialMediaSchema,
} from 'src/social-media/entities/social-media.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Handout.name, schema: HandoutSchema },
      { name: Schedule.name, schema: ScheduleSchema },
      { name: SocialMedia.name, schema: SocialMediaSchema },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
