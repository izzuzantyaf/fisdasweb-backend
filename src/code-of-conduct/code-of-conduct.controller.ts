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
import { CodeOfConductService } from 'src/code-of-conduct/code-of-conduct.service';
import { UpdateCodeOfConductDto } from 'src/code-of-conduct/dto';
import { isURL } from 'class-validator';

@Controller('/code-of-conducts')
export class CodeOfConductController {
  constructor(private codeOfConductService: CodeOfConductService) {}

  @Get()
  @UseGuards(AdminJwtAuthGuard)
  async get() {
    const codeOfConduct = await this.codeOfConductService.get();

    return new SuccessfulResponseDto(codeOfConduct);
  }

  @Get('/published')
  async getPublished() {
    const codeOfConduct = await this.codeOfConductService.getPublished();

    return new SuccessfulResponseDto(codeOfConduct);
  }

  @Patch('/:id')
  @UseGuards(AdminJwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateCodeOfConductDto) {
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

    const updatedCodeOfCondcut = await this.codeOfConductService.update(
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
