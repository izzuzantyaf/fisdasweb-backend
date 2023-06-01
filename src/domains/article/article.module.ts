import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { DataServiceModule } from 'src/database/data-service.module';
import { ArticleMongoRepository } from './repo/article-mongo.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './entities/article.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DataServiceModule,
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleMongoRepository],
  exports: [ArticleService, ArticleMongoRepository],
})
export class ArticleModule {}
