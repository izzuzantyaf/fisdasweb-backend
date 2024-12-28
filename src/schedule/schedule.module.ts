import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from 'src/schedule/repo';
import { Schedule } from 'src/schedule/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
