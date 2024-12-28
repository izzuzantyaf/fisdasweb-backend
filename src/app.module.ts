import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { HandoutModule } from 'src/handout/handout.module';
import { CodeOfConductModule } from 'src/code-of-conduct/code-of-conduct.module';
import { OrganigramModule } from 'src/organigram/organigram.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { AssistantModule } from 'src/assistant/assistant.module';
import { LabModuleModule } from 'src/lab-module/lab-module.module';
// import { ArticleModule } from 'src/article/article.module';
// import { OpenAIModule } from './common/openai/openai.module';
// import { UnsplashModule } from './common/unsplash/unsplash.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './common/database/typeorm/data-source-config';
// import { AwsSesModule } from './common/aws-ses/aws-ses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    AdminModule,
    AuthModule,
    HandoutModule,
    CodeOfConductModule,
    OrganigramModule,
    ScheduleModule,
    AssistantModule,
    LabModuleModule,
    // ArticleModule,
    // OpenAIModule,
    // UnsplashModule,
    // AwsSesModule,
  ],
})
export class AppModule {}
