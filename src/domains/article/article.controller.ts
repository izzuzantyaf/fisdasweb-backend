import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';
import { SuccessfulResponseDto } from 'src/domains/common/dto/response.dto';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // @Post()
  // create(@Body() createArticleDto: CreateArticleDto) {
  //   return this.articleService.create(createArticleDto);
  // }

  @Get()
  async findAll() {
    const articles = await this.articleService.findMany();
    return new SuccessfulResponseDto(
      'Berhasil mengambil data artikel',
      articles,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.articleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articleService.remove(+id);
  // }
}
