import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleMongoRepository } from './repo/article-mongo.repo';
import { Cron, Timeout } from '@nestjs/schedule';
import { Article } from './entities/article.entity';
import { OpenAIService } from 'src/infrastructure/openai/openai.service';
import { faker } from '@faker-js/faker';
import { UnsplashService } from 'src/infrastructure/unsplash/unsplash.service';
import { Language } from 'unsplash-js';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(
    private readonly articleRepository: ArticleMongoRepository,
    private readonly openAIService: OpenAIService,
    private readonly unsplashService: UnsplashService,
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

  // @Timeout(1000)
  async generateArticleUsingOpenAI() {
    try {
      this.logger.debug(`Generating article title`);
      const context = [
        'Teknologi',
        'Gadget',
        'Kendaraan',
        'Industri',
        'Alam semesta',
        'Lingkungan',
        'Listrik',
        'Magnet',
        'Cahaya',
        'Optik',
        'Suara',
        'Panas',
        'Termodinamika',
        'Partikel',
        'Atom',
        'Molekul',
        'Radiasi',
        'Gravitasi',
        'Hukum Newton',
        'Hukum Kekekalan Energi',
        'Gelombang elektromagnetik',
        'Medan elektromagnetik',
        'Relativitas',
        'Fisika nuklir',
        'Fisika partikel',
        'Fisika kuantum',
        'Fisika fluida',
      ];
      const articleTitleGenerationPropmtTemplates = [
        (context: string) => {
          return `berikan satu fakta tentang ${context}, tuliskan dalam satu kalimat yang mudah dipahami yang terdiri dari 15 sampai 20 kata`;
        },
        (context: string) => {
          return `berikan satu pertanyaan tentang ${context}, tuliskan dalam satu kalimat yang mudah dipahami yang terdiri dari 15 sampai 20 kata`;
        },
      ];

      let articleTitle = (
        await this.openAIService.openAIApi.createCompletion({
          model: 'text-davinci-003',
          prompt: articleTitleGenerationPropmtTemplates[
            faker.number.int({
              min: 0,
              max: articleTitleGenerationPropmtTemplates.length - 1,
            })
          ](context[faker.number.int({ min: 0, max: context.length - 1 })]),
          max_tokens: 2048,
        })
      ).data.choices[0].text;
      this.logger.debug(`Article title:`, articleTitle);

      const keyword = (
        await this.openAIService.openAIApi.createCompletion({
          model: 'text-davinci-003',
          prompt: `you have an article with title "${articleTitle}", describe a real life article thumbnail picture of that article in English, in one line, without quotes and numbering`,
          max_tokens: 2048,
        })
      ).data.choices[0].text;
      this.logger.debug('Article keyword:', keyword);

      const generatePhotoResponse =
        await this.openAIService.openAIApi.createImage({
          prompt: keyword,
        });
      const photoUrl = generatePhotoResponse.data.data[0].url;
      this.logger.debug('Article photos:', photoUrl);

      this.logger.debug(`Generating article content`);
      const articleContent = (
        await this.openAIService.openAIApi.createCompletion({
          model: 'text-davinci-003',
          prompt: `buatkan satu artikel tentang ${articleTitle} dengan mencantumkan data yang relevan menggunakan Bahasa Indonesia tanpa pembuka dan penutup`,
          max_tokens: 2048,
        })
      ).data.choices[0].text;
      this.logger.debug(`Article content: ${articleContent}`);
      articleTitle = articleTitle.replace(/\n/g, ''); // remove new line
      articleTitle = articleTitle.replace(/^['"]|['"]$/g, ''); // remove quotes di awal dan di akhir
      this.logger.debug(`cleaned title`, articleTitle);

      return new Article({
        title: articleTitle,
        content: articleContent,
        cover_image_url: photoUrl,
      });
    } catch (error) {
      this.logger.debug(`Failed to generate article:`, error);
    }
  }

  // @Timeout(1000)
  @Cron('0 0 0,3,6,8,10 * * *')
  // @Cron('*/10 * * * * *')
  async cronGenerateAndStoreArticle() {
    try {
      this.logger.log(`Cron job generate articles started`);
      const generatedArticle = await this.generateArticleUsingOpenAI();
      this.store(generatedArticle).then(() => {
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

  // findOne(id: string) {
  //   return `This action returns a #${id} blog`;
  // }

  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #${id} blog`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} blog`;
  // }
}
