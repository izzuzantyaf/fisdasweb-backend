import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddLabModuleDto, UpdateLabModuleDto } from 'src/lab-module/dto';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { LabModuleService } from './lab-module.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types';
import { isURL } from 'class-validator';
import { isIntIdValid } from 'src/common/utils';

@Controller('/lab-modules')
export class LabModuleController {
  private readonly logger = new Logger(LabModuleController.name);

  constructor(private labModuleService: LabModuleService) {}

  @Post()
  @UseGuards(AdminJwtAuthGuard)
  async add(@Req() req: AuthenticatedRequest, @Body() dto: AddLabModuleDto) {
    if (typeof dto.name !== 'string') {
      throw new BadRequestException(
        new ErrorResponseDto('name must be string'),
      );
    }

    if (typeof dto.code !== 'string') {
      throw new BadRequestException(
        new ErrorResponseDto('code must be string'),
      );
    }

    if (
      dto.pretask_link !== undefined &&
      dto.pretask_link !== null &&
      typeof dto.pretask_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('pretask_link must be string'),
      );
    }

    if (typeof dto.pretask_link === 'string' && !isURL(dto.pretask_link)) {
      throw new BadRequestException(
        new ErrorResponseDto('pretask_link must be a valid URL'),
      );
    }

    if (
      dto.pretask_is_published !== undefined &&
      typeof dto.pretask_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('pretask_is_published must be boolean'),
      );
    }

    if (
      dto.video_link !== undefined &&
      dto.video_link !== null &&
      typeof dto.video_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('video_link must be string'),
      );
    }

    if (typeof dto.video_link === 'string' && !isURL(dto.video_link)) {
      throw new BadRequestException(
        new ErrorResponseDto('video_link must be a valid URL'),
      );
    }

    if (
      dto.video_is_published !== undefined &&
      typeof dto.video_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('video_is_published must be boolean'),
      );
    }

    if (
      dto.journal_cover_link !== undefined &&
      dto.journal_cover_link !== null &&
      typeof dto.journal_cover_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('journal_cover_link must be string'),
      );
    }

    if (
      typeof dto.journal_cover_link === 'string' &&
      !isURL(dto.journal_cover_link)
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('journal_cover_link must be a valid URL'),
      );
    }

    if (
      dto.journal_cover_is_published !== undefined &&
      typeof dto.journal_cover_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('journal_cover_is_published must be boolean'),
      );
    }

    const storedData = await this.labModuleService.add(dto);

    this.logger.log(
      JSON.stringify({
        event: 'Lab Module added',
        timestamp: new Date().toISOString(),
        data: {
          id: storedData.id,
          adminId: req.user?.id,
        },
      }),
    );

    return new SuccessfulResponseDto(storedData);
  }

  @Get()
  @UseGuards(AdminJwtAuthGuard)
  async get() {
    const data = await this.labModuleService.get();

    return new SuccessfulResponseDto(data);
  }

  @Get('/pretasks/published')
  async getPreTasks() {
    const data = await this.labModuleService.getPretaskPublished();

    return new SuccessfulResponseDto(data);
  }

  @Get('/videos/published')
  async getVideos() {
    const data = await this.labModuleService.getVideoPublished();

    return new SuccessfulResponseDto(data);
  }

  @Get('/simulators/published')
  async getSimulators() {
    const data = await this.labModuleService.getSimulatorPublished();

    return new SuccessfulResponseDto(data);
  }

  @Get('/journal-covers/published')
  async getJournalCovers() {
    const data = await this.labModuleService.getJournalCoverPublished();

    return new SuccessfulResponseDto(data);
  }

  @Patch('/:id')
  @UseGuards(AdminJwtAuthGuard)
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateLabModuleDto,
  ) {
    const parsedId = Number(id);

    if (!isIntIdValid(parsedId)) {
      throw new BadRequestException(new ErrorResponseDto('id is invalid'));
    }

    if (dto.name !== undefined && typeof dto.name !== 'string') {
      throw new BadRequestException(
        new ErrorResponseDto('name must be string'),
      );
    }

    if (dto.code !== undefined && typeof dto.code !== 'string') {
      throw new BadRequestException(
        new ErrorResponseDto('code must be string'),
      );
    }

    if (
      dto.pretask_link !== undefined &&
      dto.pretask_link !== null &&
      typeof dto.pretask_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('pretask_link must be string'),
      );
    }

    if (typeof dto.pretask_link === 'string' && !isURL(dto.pretask_link)) {
      throw new BadRequestException(
        new ErrorResponseDto('pretask_link must be a valid URL'),
      );
    }

    if (
      dto.pretask_is_published !== undefined &&
      typeof dto.pretask_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('pretask_is_published must be boolean'),
      );
    }

    if (
      dto.video_link !== undefined &&
      dto.video_link !== null &&
      typeof dto.video_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('video_link must be string'),
      );
    }

    if (typeof dto.video_link === 'string' && !isURL(dto.video_link)) {
      throw new BadRequestException(
        new ErrorResponseDto('video_link must be a valid URL'),
      );
    }

    if (
      dto.video_is_published !== undefined &&
      typeof dto.video_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('video_is_published must be boolean'),
      );
    }

    if (
      dto.journal_cover_link !== undefined &&
      dto.journal_cover_link !== null &&
      typeof dto.journal_cover_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('journal_cover_link must be string'),
      );
    }

    if (
      typeof dto.journal_cover_link === 'string' &&
      !isURL(dto.journal_cover_link)
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('journal_cover_link must be a valid URL'),
      );
    }

    if (
      dto.journal_cover_is_published !== undefined &&
      typeof dto.journal_cover_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('journal_cover_is_published must be boolean'),
      );
    }

    const updateResult = await this.labModuleService.update(parsedId, dto);

    if (updateResult.result.affected === 0) {
      return new SuccessfulResponseDto(
        null,
        'Record not found. No changes made',
      );
    }

    this.logger.log(
      JSON.stringify({
        event: 'Lab Module updated',
        timestamp: new Date().toISOString(),
        data: {
          id: updateResult.updated.id,
          adminId: req.user?.id,
        },
      }),
    );

    return new SuccessfulResponseDto(updateResult.updated);
  }

  @Delete('/:id')
  @UseGuards(AdminJwtAuthGuard)
  async delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const parsedId = Number(id);

    if (!isIntIdValid(parsedId)) {
      throw new BadRequestException(new ErrorResponseDto('id is invalid'));
    }

    const deleteResult = await this.labModuleService.delete(parsedId);

    if (deleteResult.result.affected === 0) {
      return new SuccessfulResponseDto(
        null,
        'Record not found. No changes made',
      );
    }

    this.logger.log(
      JSON.stringify({
        event: 'Lab Module deleted',
        timestamp: new Date().toISOString(),
        data: {
          id: deleteResult.deleted.id,
          adminId: req.user?.id,
        },
      }),
    );

    return new SuccessfulResponseDto();
  }
}
