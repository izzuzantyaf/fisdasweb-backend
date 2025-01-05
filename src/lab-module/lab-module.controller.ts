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
  AddLabModuleDto,
  GetLabModuleQueryParams,
  LabModuleSortKey,
  UpdateLabModuleDto,
} from 'src/lab-module/dto';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { LabModuleService } from './lab-module.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types';
import { isURL } from 'class-validator';
import { isIntIdValid, normalizeDto } from 'src/common/utils';
import { SortOrder } from 'src/common/types';

@Controller('/lab-modules')
export class LabModuleController {
  private readonly logger = new Logger(LabModuleController.name);

  constructor(private labModuleService: LabModuleService) {}

  private readonly VALID_SORT_KEYS: Set<LabModuleSortKey> = new Set([
    'name',
    'code',
    'created_at',
  ]);

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

    if (
      dto.simulator_link !== undefined &&
      dto.simulator_link !== null &&
      typeof dto.simulator_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('simulator_link must be string'),
      );
    }

    if (typeof dto.simulator_link === 'string' && !isURL(dto.simulator_link)) {
      throw new BadRequestException(
        new ErrorResponseDto('simulator_link must be a valid URL'),
      );
    }

    if (
      dto.simulator_is_published !== undefined &&
      typeof dto.simulator_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('simulator_is_published must be boolean'),
      );
    }

    normalizeDto(dto);

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
  async get(@Query() query: GetLabModuleQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      LabModuleSortKey,
      SortOrder,
    ];

    const VALID_SORT_KEYS = this.VALID_SORT_KEYS;

    if (sortKey && !VALID_SORT_KEYS.has(sortKey as LabModuleSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(VALID_SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.labModuleService.get({
      sort: {
        [sortKey]: sortOrder,
      },
      search: query.search,
    });

    return new SuccessfulResponseDto(data);
  }

  @Get('/pretasks/published')
  async getPreTasks(@Query() query: GetLabModuleQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      LabModuleSortKey,
      SortOrder,
    ];

    const VALID_SORT_KEYS = this.VALID_SORT_KEYS;

    if (sortKey && !VALID_SORT_KEYS.has(sortKey as LabModuleSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(VALID_SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.labModuleService.getPretaskPublished({
      sort: {
        [sortKey]: sortOrder,
      },
      search: query.search,
    });

    return new SuccessfulResponseDto(data);
  }

  @Get('/videos/published')
  async getVideos(@Query() query: GetLabModuleQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      LabModuleSortKey,
      SortOrder,
    ];

    const VALID_SORT_KEYS = this.VALID_SORT_KEYS;

    if (sortKey && !VALID_SORT_KEYS.has(sortKey as LabModuleSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(VALID_SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.labModuleService.getVideoPublished({
      sort: {
        [sortKey]: sortOrder,
      },
      search: query.search,
    });

    return new SuccessfulResponseDto(data);
  }

  @Get('/simulators/published')
  async getSimulators(@Query() query: GetLabModuleQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      LabModuleSortKey,
      SortOrder,
    ];

    const VALID_SORT_KEYS = this.VALID_SORT_KEYS;

    if (sortKey && !VALID_SORT_KEYS.has(sortKey as LabModuleSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(VALID_SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.labModuleService.getSimulatorPublished({
      sort: {
        [sortKey]: sortOrder,
      },
      search: query.search,
    });

    return new SuccessfulResponseDto(data);
  }

  @Get('/journal-covers/published')
  async getJournalCovers(@Query() query: GetLabModuleQueryParams) {
    const sort = query.sort;

    const [sortKey, sortOrder] = (sort?.split('-') ?? []) as [
      LabModuleSortKey,
      SortOrder,
    ];

    const VALID_SORT_KEYS = this.VALID_SORT_KEYS;

    if (sortKey && !VALID_SORT_KEYS.has(sortKey as LabModuleSortKey)) {
      throw new BadRequestException(
        new ErrorResponseDto(
          `sort must be one of ${Array.from(VALID_SORT_KEYS).join(', ')} and optionally followed by '-asc' or '-desc'`,
        ),
      );
    }

    const data = await this.labModuleService.getJournalCoverPublished({
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

    if (
      dto.simulator_link !== undefined &&
      dto.simulator_link !== null &&
      typeof dto.simulator_link !== 'string'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('simulator_link must be string'),
      );
    }

    if (typeof dto.simulator_link === 'string' && !isURL(dto.simulator_link)) {
      throw new BadRequestException(
        new ErrorResponseDto('simulator_link must be a valid URL'),
      );
    }

    if (
      dto.simulator_is_published !== undefined &&
      typeof dto.simulator_is_published !== 'boolean'
    ) {
      throw new BadRequestException(
        new ErrorResponseDto('simulator_is_published must be boolean'),
      );
    }

    normalizeDto(dto);

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
