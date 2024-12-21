import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Handout, HandoutDocument } from 'src/handout/entities/handout.entity';
import {
  Schedule,
  ScheduleDocument,
} from 'src/schedule/entities/schedule.entity';
import { handoutSeeder } from 'src/handout/seed/handout.seed';
import { scheduleSeeder } from 'src/schedule/seed/schedule.seed';
import { AssistantRepository } from 'src/assistant/repo';
import { HandoutMongoRepository } from 'src/handout/repo/handout-mongo.repo';
import { ScheduleMongoRepository } from 'src/schedule/repo/schedule-mongo.repo';

@Injectable()
export class MongoService {
  handouts: HandoutMongoRepository;
  schedules: ScheduleMongoRepository;
  assistants: AssistantRepository;

  constructor(
    @InjectModel(Handout.name) private handoutModel: Model<HandoutDocument>,
    @InjectModel(Schedule.name)
    private scheduleModel: Model<ScheduleDocument>,
  ) {
    this.handouts = new HandoutMongoRepository(this.handoutModel);
    this.schedules = new ScheduleMongoRepository(this.scheduleModel);
    this.seedHandout();
    this.seedSchedule();
  }

  protected seedHandout() {
    const handouts = handoutSeeder.map(
      (handoutSeed) => new Handout(handoutSeed),
    );
    this.handouts.seed(handouts);
  }

  protected seedSchedule() {
    const schedules = scheduleSeeder.map((schedule) => new Schedule(schedule));
    this.schedules.seed(schedules);
  }
}
