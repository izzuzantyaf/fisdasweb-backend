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
import { AddAssistantDto, UpdateAssistantDto } from 'src/assistant/dto';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { AssistantService } from 'src/assistant/assistant.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types';
import { isIntIdValid } from 'src/common/utils';

@Controller('/assistants')
export class AssistantController {
  private readonly logger = new Logger(AssistantController.name);

  constructor(private assistantService: AssistantService) {}

  @Post()
  @UseGuards(AdminJwtAuthGuard)
  async add(@Req() req: AuthenticatedRequest, @Body() dto: AddAssistantDto) {
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
      dto.line_id !== undefined &&
      dto.line_id !== null &&
      typeof dto.line_id !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('line_id must be string'),
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

    const storedData = await this.assistantService.add(dto);

    this.logger.debug(
      JSON.stringify({
        event: 'Assistant added',
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
    const data = await this.assistantService.get();

    return new SuccessfulResponseDto(data);
  }

  @Get('/published')
  async getPublished() {
    const data = await this.assistantService.getPublished();

    return new SuccessfulResponseDto(data);
  }

  @Patch('/:id')
  @UseGuards(AdminJwtAuthGuard)
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateAssistantDto,
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
      dto.line_id !== undefined &&
      dto.line_id !== null &&
      typeof dto.line_id !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('line_id must be string'),
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

    const updateResult = await this.assistantService.update(parsedId, dto);

    if (updateResult.result.affected === 0) {
      return new SuccessfulResponseDto(
        null,
        'Record not found. No changes made',
      );
    }

    this.logger.debug(
      JSON.stringify({
        event: 'Assistant updated',
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

    const deleteResult = await this.assistantService.delete(parsedId);

    if (deleteResult.result.affected === 0) {
      return new SuccessfulResponseDto(
        null,
        'Record not found. No changes made',
      );
    }

    this.logger.log(
      JSON.stringify({
        event: 'Assistant deleted',
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
