import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongoModule } from 'src/infrastructure/database/mongodb/mongo.module';
import { ArticleMongoRepository } from './repo/article-mongo.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './entities/article.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { OpenAIModule } from 'src/infrastructure/openai/openai.module';
import { UnsplashModule } from 'src/infrastructure/unsplash/unsplash.module';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ScheduleModule.forRoot(),
    OpenAIModule,
    UnsplashModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleMongoRepository],
  exports: [ArticleService, ArticleMongoRepository],
})
export class ArticleModule {}
