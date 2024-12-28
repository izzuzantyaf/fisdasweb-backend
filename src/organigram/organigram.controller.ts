import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { OrganigramService } from 'src/organigram/organigram.service';
import { UpdateOrganigramDto } from 'src/organigram/dto';
import { isURL } from 'class-validator';

@Controller('/organigrams')
export class OrganigramController {
  constructor(private organigramService: OrganigramService) {}

  @Get()
  @UseGuards(AdminJwtAuthGuard)
  async get() {
    const organigram = await this.organigramService.get();

    return new SuccessfulResponseDto(organigram);
  }

  @Get('/published')
  async getPublished() {
    const organigram = await this.organigramService.getPublished();

    return new SuccessfulResponseDto(organigram);
  }

  @Patch('/:id')
  @UseGuards(AdminJwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateOrganigramDto) {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException(new ErrorResponseDto('id is invalid'));
    }

    if (
      dto.link !== undefined &&
      dto.link !== null &&
      typeof dto.link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('link must be string'),
      );
    }

    if (typeof dto.link === 'string' && !isURL(dto.link)) {
      throw new BadRequestException(
        new ErrorResponseDto('link must be a valid URL'),
      );
    }

    if (
      dto.is_published !== undefined &&
      typeof dto.is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('is_published must be boolean'),
      );
    }

    const updatedCodeOfCondcut = await this.organigramService.update(
      parsedId,
      dto,
    );

    let message: string;
    if (updatedCodeOfCondcut === null) {
      message = 'Record not found. No changes made';
    }

    return new SuccessfulResponseDto(updatedCodeOfCondcut, message);
  }
}
