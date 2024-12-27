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
import { AddScheduleDto, UpdateScheduleDto } from 'src/schedule/dto';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { ScheduleService } from 'src/schedule/schedule.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { isURL } from 'class-validator';
import { AuthenticatedRequest } from 'src/auth/types';
import { isIntIdValid, isNotUndefinedOrNull } from 'src/common/utils';

@Controller('/schedules')
export class ScheduleController {
  private readonly logger = new Logger(ScheduleController.name);

  constructor(private readonly service: ScheduleService) {}

  @Post()
  @UseGuards(AdminJwtAuthGuard)
  async add(@Req() req: AuthenticatedRequest, @Body() dto: AddScheduleDto) {
    if (typeof dto.name !== 'string') {
      throw new BadRequestException(
        new ErrorResponseDto('name must be string'),
      );
    }

    if (typeof dto.link !== 'string') {
      throw new BadRequestException(
        new ErrorResponseDto('link must be string'),
      );
    }

    if (!isURL(dto.link)) {
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

    const storedData = await this.service.add(dto);

    this.logger.log(
      JSON.stringify({
        event: 'Schedule added',
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
    const data = await this.service.get();

    return new SuccessfulResponseDto(data);
  }

  @Get('/published')
  async getPublished() {
    const data = await this.service.getPublished();

    return new SuccessfulResponseDto(data);
  }

  @Patch('/:id')
  @UseGuards(AdminJwtAuthGuard)
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateScheduleDto,
  ) {
    const parsedId = Number(id);

    if (!isIntIdValid(parsedId)) {
      throw new BadRequestException(new ErrorResponseDto('Invalid id'));
    }

    if (isNotUndefinedOrNull(dto.name) && typeof dto.name !== 'string') {
      throw new BadRequestException(
        new ErrorResponseDto('name must be string'),
      );
    }

    if (isNotUndefinedOrNull(dto.link) && typeof dto.link !== 'string') {
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

    const updateResult = await this.service.update(parsedId, dto);

    if (updateResult.result.affected === 0) {
      return new SuccessfulResponseDto(
        null,
        'Record not found. No changes made',
      );
    }

    this.logger.log(
      JSON.stringify({
        event: 'Schedule updated',
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
      throw new BadRequestException(new ErrorResponseDto('Invalid id'));
    }

    const deleteResult = await this.service.delete(parsedId);

    if (deleteResult.result.affected > 0) {
      this.logger.log(
        JSON.stringify({
          event: 'Schedule deleted',
          timestamp: new Date().toISOString(),
          data: {
            id: deleteResult.deleted.id,
            adminId: req.user?.id,
          },
        }),
      );
    }

    return new SuccessfulResponseDto();
  }
}
