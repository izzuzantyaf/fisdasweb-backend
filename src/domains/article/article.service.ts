import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleMongoRepository } from './repo/article-mongo.repo';
import { Timeout } from '@nestjs/schedule';
import { Article } from './entities/article.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(private readonly articleRepository: ArticleMongoRepository) {}

  /**
   * Menyimpan artikel
   *
   * @flow
   * - Validasi data
   * - Jika ada data yang tidak valid, throw error
   * - Jika data valid, simpan artikel ke database
   * @param createArticleDto Data artikel yang akan disimpan
   * @returns
   */
  async store(createArticleDto: CreateArticleDto) {
    try {
      const newArticle = await this.articleRepository.store(createArticleDto);
      this.logger.debug('Stored article:', newArticle);
      this.logger.log(
        `New article stored: ${JSON.stringify({ id: newArticle._id })}`,
      );
      return newArticle;
    } catch (error) {
      this.logger.debug('Failed to store article:', error);
      throw error;
    }
  }

  cronGenerateArticles() {
    try {
      this.logger.log(`Cron job generate articles started`);
      const ARTICLE_AMOUNT = 2;
      const articleStorePromises: Promise<Article>[] = [];
      for (let i = 0; i < ARTICLE_AMOUNT; i++) {
        articleStorePromises.push(
          this.store({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs({ min: 3, max: 6 }),
            cover_image_url: faker.image.url(),
          }),
        );
      }
      Promise.allSettled(articleStorePromises).finally(() => {
        this.logger.log(`Cron job generate articles done`);
      });
      return;
    } catch (error) {
      this.logger.debug('Cron job generate articles failed:', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
