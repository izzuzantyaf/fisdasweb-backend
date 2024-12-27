import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Schedule,
  ScheduleDocument,
} from 'src/schedule/entities/schedule.entity';
import { scheduleSeeder } from 'src/schedule/seed/schedule.seed';
import { AssistantRepository } from 'src/assistant/repo';
import { ScheduleMongoRepository } from 'src/schedule/repo/schedule-mongo.repo';

@Injectable()
export class MongoService {
  schedules: ScheduleMongoRepository;
  assistants: AssistantRepository;

  constructor(
    @InjectModel(Schedule.name)
    private scheduleModel: Model<ScheduleDocument>,
  ) {
    this.schedules = new ScheduleMongoRepository(this.scheduleModel);
    this.seedSchedule();
  }

  protected seedSchedule() {
    const schedules = scheduleSeeder.map((schedule) => new Schedule(schedule));
    this.schedules.seed(schedules);
  }
}
