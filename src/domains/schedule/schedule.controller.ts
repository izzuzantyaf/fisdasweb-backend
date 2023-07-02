import { Body, Controller, Get, Logger, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponseDto } from 'src/domains/common/dto/response.dto';
import {
  ScheduleQuery,
  UpdateScheduleDto,
} from 'src/domains/schedule/dto/schedule.dto';
import { ScheduleService } from 'src/domains/schedule/schedule.service';

@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  private readonly logger = new Logger(ScheduleController.name);

  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async getAll(@Query() filter?: ScheduleQuery) {
    const schedules = await this.scheduleService.getAll(filter);
    return new SuccessfulResponseDto('Sukses', schedules);
  }

  @Put()
  async update(@Body() updateScheduleDto: UpdateScheduleDto) {
    const updatedSchedule = await this.scheduleService.update(
      updateScheduleDto,
    );
    return new SuccessfulResponseDto(
      'Jadwal berhasil diupdate',
      updatedSchedule,
    );
  }
}
