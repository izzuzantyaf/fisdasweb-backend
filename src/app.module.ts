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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './common/database/typeorm/data-source-config';
import { AwsSesModule } from './common/aws-ses/aws-ses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          NODE_ENV: process.env.NODE_ENV,
          PORT: parseInt(process.env.PORT, 10),
          JWT_SECRET: process.env.JWT_SECRET,
          MONGO: {
            URI: process.env.MONGO_URI,
          },
          OPENAI: {
            ORGANIZATION_ID: process.env.OPENAI_ORGANIZATION_ID,
            API_KEY: process.env.OPENAI_API_KEY,
          },
          UNSPLASH: {
            ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
            SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
          },
        }),
      ],
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
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
    AwsSesModule,
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
