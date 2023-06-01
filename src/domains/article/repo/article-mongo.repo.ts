import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../entities/article.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export interface ArticleRepositoryInterface {
  store(article: Article): Promise<Article>;
  getMany(): Promise<Article[]>;
}

@Injectable()
export class ArticleMongoRepository implements ArticleRepositoryInterface {
  protected model: Model<ArticleDocument>;

  constructor(
    @InjectModel(Article.name) articleMongoModel: Model<ArticleDocument>,
  ) {
    this.model = articleMongoModel;
  }

  async store(article: Article): Promise<Article> {
    const storedArticle = await this.model.create(article);
    return storedArticle;
  }
  getMany(): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }
}
