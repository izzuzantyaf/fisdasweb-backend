import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Assistant,
  AssistantDocument,
} from 'src/assistant/entities/assistant.entity';
import { Handout, HandoutDocument } from 'src/handout/entities/handout.entity';
import {
  PracticumModule,
  PracticumModuleDocument,
} from 'src/practicum-module/entities/practicum-module.entity';
import {
  Schedule,
  ScheduleDocument,
} from 'src/schedule/entities/schedule.entity';
import { assistantSeeder } from 'src/assistant/seed/assistant.seed';
import { handoutSeeder } from 'src/handout/seed/handout.seed';
import { practicumModuleSeeder } from 'src/practicum-module/seed/practicum-module.seed';
import { scheduleSeeder } from 'src/schedule/seed/schedule.seed';
import { AssistantMongoRepository } from 'src/assistant/repo/assistant-mongo.repo';
import { HandoutMongoRepository } from 'src/handout/repo/handout-mongo.repo';
import { PracticumModuleMongoRepository } from 'src/practicum-module/repo/practicum-module-mongo.repo';
import { ScheduleMongoRepository } from 'src/schedule/repo/schedule-mongo.repo';
import { SocialMediaMongoRepository } from 'src/social-media/repo/social-media-mongo.repo';
import {
  SocialMedia,
  SocialMediaDocument,
} from 'src/social-media/entities/social-media.entity';
import { socialMediaSeeder } from 'src/social-media/seed/social-media.seed';

@Injectable()
export class MongoService {
  handouts: HandoutMongoRepository;
  schedules: ScheduleMongoRepository;
  assistants: AssistantMongoRepository;
  practicumModules: PracticumModuleMongoRepository;
  socialMedias: SocialMediaMongoRepository;

  constructor(
    @InjectModel(Handout.name) private handoutModel: Model<HandoutDocument>,
    @InjectModel(Schedule.name)
    private scheduleModel: Model<ScheduleDocument>,
    @InjectModel(Assistant.name)
    private assistantModel: Model<AssistantDocument>,
    @InjectModel(PracticumModule.name)
    private practicumModuleModel: Model<PracticumModuleDocument>,
    @InjectModel(SocialMedia.name)
    private socialMediaModel: Model<SocialMediaDocument>,
  ) {
    this.handouts = new HandoutMongoRepository(this.handoutModel);
    this.schedules = new ScheduleMongoRepository(this.scheduleModel);
    this.assistants = new AssistantMongoRepository(this.assistantModel);
    this.practicumModules = new PracticumModuleMongoRepository(
      this.practicumModuleModel,
    );
    this.socialMedias = new SocialMediaMongoRepository(this.socialMediaModel);
    this.seedHandout();
    this.seedSchedule();
    this.seedAssistant();
    this.seedPracticumModule();
    this.seedSocialMedia();
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

  protected seedAssistant() {
    const assistants = assistantSeeder.map(
      (assistant) => new Assistant(assistant),
    );
    this.assistants.seed(assistants);
  }

  protected seedPracticumModule(): void {
    const practicumModules = practicumModuleSeeder.map(
      (practicumModule) =>
        new PracticumModule(practicumModule as PracticumModule),
    );
    this.practicumModules.seed(practicumModules);
  }

  protected seedSocialMedia(): void {
    const socialMedias = socialMediaSeeder.map(
      (socialMedia) => new SocialMedia(socialMedia),
    );
    this.socialMedias.seed(socialMedias);
  }
}
