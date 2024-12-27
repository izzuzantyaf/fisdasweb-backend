import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import {
  Schedule,
  ScheduleSchema,
} from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
