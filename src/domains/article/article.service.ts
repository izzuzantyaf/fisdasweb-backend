import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleMongoRepository } from './repo/article-mongo.repo';
import { Cron, Timeout } from '@nestjs/schedule';
import { Article } from './entities/article.entity';
import { OpenAIService } from 'src/modules/openai/openai.service';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(
    private readonly articleRepository: ArticleMongoRepository,
    private readonly openAIService: OpenAIService,
  ) {}

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

  @Cron('0 0 7,10,13,15,18 * * *')
  cronGenerateArticles() {
    try {
      this.logger.log(`Cron job generate articles started`);
      const ARTICLE_AMOUNT = 1;
      const articleStorePromises: Promise<Article>[] = [];
      for (let i = 0; i < ARTICLE_AMOUNT; i++) {
        const generateArticlePromise = new Promise<Article>(
          async (resolve, reject) => {
            try {
              this.logger.debug(`Generating article title [${i + 1}]`);
              let articleTitle = (
                await this.openAIService.openAIApi.createCompletion({
                  model: 'text-davinci-003',
                  prompt:
                    'tuliskan satu baris judul artikel tentang fisika yang membuat pembaca penasaran namun tidak terlalu rumit dan membosankan dalam bahasa indonesia',
                  max_tokens: 2048,
                })
              ).data.choices[0].text;
              this.logger.debug(`Article title [${i + 1}]:`, articleTitle);

              this.logger.debug(`Generating article content [${i + 1}]`);
              const articleContent = (
                await this.openAIService.openAIApi.createCompletion({
                  model: 'text-davinci-003',
                  prompt: `buatkan satu artikel dengan judul ${articleTitle} dalam bahasa indonesia tanpa judul dan penutup`,
                  max_tokens: 2048,
                })
              ).data.choices[0].text;
              this.logger.debug(
                `Article content [${i + 1}]: ${articleContent}`,
              );
              articleTitle = articleTitle.replace(/\n/g, ''); // remove new line
              articleTitle = articleTitle.replace(/^['"]|['"]$/g, ''); // remove quotes di awal dan di akhir
              this.logger.debug(`cleaned title`, articleTitle);
              const storeArticlePromise = this.store({
                title: articleTitle,
                content: articleContent,
              });
              resolve(storeArticlePromise);
            } catch (error) {
              this.logger.debug(
                `Failed to generate article [${i + 1}]:`,
                error,
              );
              reject(error);
            }
          },
        );
        articleStorePromises.push(generateArticlePromise);
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

  async findMany() {
    try {
      const articles = await this.articleRepository.getMany();
      return articles;
    } catch (error) {
      this.logger.debug('Failed to get articles:', error);
      throw error;
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
