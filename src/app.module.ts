import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { HandoutModule } from 'src/handout/handout.module';
import { CodeOfConductModule } from 'src/code-of-conduct/code-of-conduct.module';
import { OrganigramModule } from 'src/organigram/organigram.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { AssistantModule } from 'src/assistant/assistant.module';
import { PracticumModuleModule } from 'src/practicum-module/practicum-module.module';
import { RequestLoggingMiddleware } from './common/middleware/request-logging.middleware';
import { SocialMediaModule } from 'src/social-media/social-media.module';
import { ArticleModule } from 'src/article/article.module';
import { OpenAIModule } from './common/openai/openai.module';
import { UnsplashModule } from './common/unsplash/unsplash.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    HandoutModule,
    CodeOfConductModule,
    OrganigramModule,
    ScheduleModule,
    AssistantModule,
    PracticumModuleModule,
    SocialMediaModule,
    ArticleModule,
    OpenAIModule,
    UnsplashModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
