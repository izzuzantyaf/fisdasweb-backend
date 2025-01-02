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
  AddHandoutDto,
  GetHandoutQueryParams,
  HandoutSortKey,
  UpdateHandoutDto,
} from 'src/handout/dto';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { HandoutService } from 'src/handout/handout.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { isURL } from 'class-validator';
import { AuthenticatedRequest } from 'src/auth/types';
import { isIntIdValid, isNotUndefinedOrNull } from 'src/common/utils';
import { SortOrder } from 'src/common/types';

@Controller('/handouts')
export class HandoutController {
  private readonly logger = new Logger(HandoutController.name);

  constructor(private readonly service: HandoutService) {}

  @Post()
  @UseGuards(AdminJwtAuthGuard)
  async add(@Req() req: AuthenticatedRequest, @Body() dto: AddHandoutDto) {
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
        event: 'Handout added',
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
  async get(@Query() query: GetHandoutQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      HandoutSortKey,
      SortOrder,
    ];

    const VALID_SORT_KEYS: Set<HandoutSortKey> = new Set([
      'created_at',
      'is_published',
    ]);

    if (sortKey && !VALID_SORT_KEYS.has(sortKey as HandoutSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(VALID_SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.service.get({
      sort: {
        [sortKey]: sortOrder,
      },
      search: query.search,
    });

    return new SuccessfulResponseDto(data);
  }

  @Get('/published')
  async getPublished(@Query() query: GetHandoutQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      HandoutSortKey,
      SortOrder,
    ];

    const VALID_SORT_KEYS: Set<HandoutSortKey> = new Set([
      'created_at',
      'is_published',
    ]);

    if (sortKey && !VALID_SORT_KEYS.has(sortKey as HandoutSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(VALID_SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.service.getPublished({
      sort: {
        [sortKey]: sortOrder,
      },
      search: query.search,
    });

    return new SuccessfulResponseDto(data);
  }

  @Patch('/:id')
  @UseGuards(AdminJwtAuthGuard)
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateHandoutDto,
  ) {
    const parsedId = Number(id);

    if (!isIntIdValid(parsedId)) {
      throw new BadRequestException(new ErrorResponseDto('id is invalid'));
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
        event: 'Handout updated',
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

    const deleteResult = await this.service.delete(parsedId);

    if (deleteResult.result.affected === 0) {
      return new SuccessfulResponseDto(
        null,
        'Record not found. No changes made',
      );
    }

    this.logger.log(
      JSON.stringify({
        event: 'Handout deleted',
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
