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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AddAssistantDto,
  AssistantSortKey,
  GetAssistantQueryParams,
  UpdateAssistantDto,
} from 'src/assistant/dto';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { AssistantService } from 'src/assistant/assistant.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types';
import { isIntIdValid } from 'src/common/utils';
import { ASSISTANT_LEVEL } from 'src/assistant/constants';
import { SortOrder } from 'src/common/types';

@Controller('/assistants')
export class AssistantController {
  private readonly logger = new Logger(AssistantController.name);

  constructor(private assistantService: AssistantService) {}

  private readonly SORT_KEYS: Set<AssistantSortKey> = new Set([
    'name',
    'code',
    'level',
    'line_id',
  ]);

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

    const levelSet = new Set(Object.values(ASSISTANT_LEVEL));
    if (!levelSet.has(dto.level)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `level must be one of ${Array.from(levelSet).join(', ')}`,
        ),
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

    this.logger.log(
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
  async get(@Query() query: GetAssistantQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      AssistantSortKey,
      SortOrder,
    ];

    const SORT_KEYS = this.SORT_KEYS;

    if (sortKey && !SORT_KEYS.has(sortKey as AssistantSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.assistantService.get({
      sort: sortKey && {
        [sortKey]: sortOrder,
      },
      search: query.search,
      level: query.level,
    });

    return new SuccessfulResponseDto(data);
  }

  @Get('/published')
  async getPublished(@Query() query: GetAssistantQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      AssistantSortKey,
      SortOrder,
    ];

    const SORT_KEYS = this.SORT_KEYS;

    if (sortKey && !SORT_KEYS.has(sortKey as AssistantSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.assistantService.getPublished({
      sort: sortKey && {
        [sortKey]: sortOrder,
      },
      search: query.search,
      level: query.level,
    });

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

    const levelSet = new Set(Object.values(ASSISTANT_LEVEL));
    if (dto.level !== undefined && !levelSet.has(dto.level)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `level must be one of ${Array.from(levelSet).join(', ')}`,
        ),
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

    this.logger.log(
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
