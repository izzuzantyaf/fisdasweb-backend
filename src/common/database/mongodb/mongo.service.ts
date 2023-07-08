import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/admin/entities/admin.entity';
import {
  Assistant,
  AssistantDocument,
} from 'src/assistant/entities/assistant.entity';
import {
  CodeOfConduct,
  CodeOfConductDocument,
} from 'src/code-of-conduct/entities/code-of-conduct.entity';
import { Handout, HandoutDocument } from 'src/handout/entities/handout.entity';
import {
  Organigram,
  OrganigramDocument,
} from 'src/organigram/entities/organigram.entity';
import {
  PracticumModule,
  PracticumModuleDocument,
} from 'src/practicum-module/entities/practicum-module.entity';
import {
  Schedule,
  ScheduleDocument,
} from 'src/schedule/entities/schedule.entity';
import { adminSeeder } from 'src/admin/seed/admin.seed';
import { assistantSeeder } from 'src/assistant/seed/assistant.seed';
import { codeOfConductSeeder } from 'src/code-of-conduct/seed/code-of-conduct.seed';
import { handoutSeeder } from 'src/handout/seed/handout.seed';
import { organigramSeeder } from 'src/organigram/seed/organigram.seed';
import { practicumModuleSeeder } from 'src/practicum-module/seed/practicum-module.seed';
import { scheduleSeeder } from 'src/schedule/seed/schedule.seed';
import { AdminMongoRepository } from 'src/admin/repo/admin-mongo.repo';
import { AssistantMongoRepository } from 'src/assistant/repo/assistant-mongo.repo';
import { CodeOfConductMongoRepository } from 'src/code-of-conduct/repo/code-of-conduct-mongo.repo';
import { HandoutMongoRepository } from 'src/handout/repo/handout-mongo.repo';
import { OrganigramMongoRepository } from 'src/organigram/repo/organigram-mongo.repo';
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
  admins: AdminMongoRepository;
  handouts: HandoutMongoRepository;
  codeOfConducts: CodeOfConductMongoRepository;
  organigrams: OrganigramMongoRepository;
  schedules: ScheduleMongoRepository;
  assistants: AssistantMongoRepository;
  practicumModules: PracticumModuleMongoRepository;
  socialMedias: SocialMediaMongoRepository;

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Handout.name) private handoutModel: Model<HandoutDocument>,
    @InjectModel(CodeOfConduct.name)
    private codeOfConductModel: Model<CodeOfConductDocument>,
    @InjectModel(Organigram.name)
    private organigramModel: Model<OrganigramDocument>,
    @InjectModel(Schedule.name)
    private scheduleModel: Model<ScheduleDocument>,
    @InjectModel(Assistant.name)
    private assistantModel: Model<AssistantDocument>,
    @InjectModel(PracticumModule.name)
    private practicumModuleModel: Model<PracticumModuleDocument>,
    @InjectModel(SocialMedia.name)
    private socialMediaModel: Model<SocialMediaDocument>,
  ) {
    this.admins = new AdminMongoRepository(this.adminModel);
    this.handouts = new HandoutMongoRepository(this.handoutModel);
    this.codeOfConducts = new CodeOfConductMongoRepository(
      this.codeOfConductModel,
    );
    this.organigrams = new OrganigramMongoRepository(this.organigramModel);
    this.schedules = new ScheduleMongoRepository(this.scheduleModel);
    this.assistants = new AssistantMongoRepository(this.assistantModel);
    this.practicumModules = new PracticumModuleMongoRepository(
      this.practicumModuleModel,
    );
    this.socialMedias = new SocialMediaMongoRepository(this.socialMediaModel);
    this.seedAdmin();
    this.seedHandout();
    this.seedCodeOfConduct();
    this.seedOrganigram();
    this.seedSchedule();
    this.seedAssistant();
    this.seedPracticumModule();
    this.seedSocialMedia();
  }

  protected async seedAdmin() {
    const admin = new Admin(adminSeeder);
    await admin.hashPassword();
    this.admins.seed(admin);
  }

  protected seedHandout() {
    const handouts = handoutSeeder.map(
      (handoutSeed) => new Handout(handoutSeed),
    );
    this.handouts.seed(handouts);
  }

  protected seedCodeOfConduct() {
    const codeOfConduct = new CodeOfConduct(codeOfConductSeeder);
    this.codeOfConducts.seed(codeOfConduct);
  }

  protected seedOrganigram() {
    const organigram = new Organigram(organigramSeeder);
    this.organigrams.seed(organigram);
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
