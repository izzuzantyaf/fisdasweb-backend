import { Body, Controller, Get, Logger, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HandoutQuery, UpdateHandoutDto } from 'src/handout/dto/handout.dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { HandoutService } from 'src/handout/handout.service';

@ApiTags('handout')
@Controller('handout')
export class HandoutController {
  private readonly logger = new Logger(HandoutController.name);

  constructor(private readonly handoutService: HandoutService) {}

  @Get()
  async getAll(@Query() filter?: HandoutQuery) {
    const handouts = await this.handoutService.getAll(filter);
    return new SuccessfulResponseDto('Sukses', handouts);
  }

  @Put()
  async update(@Body() updateHandoutDto: UpdateHandoutDto) {
    const updatedHandout = await this.handoutService.update(updateHandoutDto);
    return new SuccessfulResponseDto('Modul berhasil diupdate', updatedHandout);
  }
}
