import { PickType } from '@nestjs/swagger';
import { Article } from '../entities/article.entity';

/**
 * Struktur data yang dibutuhkan untuk membuat artikel baru.
 */
export class CreateArticleDto extends PickType(Article, [
  'title',
  'content',
  'cover_image_url',
]) {}
