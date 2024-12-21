import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdateLabModuleDto } from 'src/lab-module/dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { LabModuleService } from './lab-module.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import ApiKeyGuard from 'src/auth/guard/api-key.guard';

@Controller('lab-modules')
export class LabModuleController {
  constructor(private labModuleService: LabModuleService) {}

  @Get()
  @UseGuards(AdminJwtAuthGuard)
  async getAll() {
    const labModules = await this.labModuleService.getAll();
    return new SuccessfulResponseDto(labModules);
  }

  @Get('/pretasks')
  @UseGuards(ApiKeyGuard)
  async getPreTasks() {
    const preTasks = await this.labModuleService.getPreTasks();
    return new SuccessfulResponseDto(preTasks);
  }

  @Get('/videos')
  @UseGuards(ApiKeyGuard)
  async getVideos() {
    const preTasks = await this.labModuleService.getVideos();
    return new SuccessfulResponseDto(preTasks);
  }

  @Get('/simulators')
  @UseGuards(ApiKeyGuard)
  async getSimulators() {
    const preTasks = await this.labModuleService.getSimulators();
    return new SuccessfulResponseDto(preTasks);
  }

  @Get('/journal-covers')
  @UseGuards(ApiKeyGuard)
  async getJournalCovers() {
    const preTasks = await this.labModuleService.getJournalCovers();
    return new SuccessfulResponseDto(preTasks);
  }

  @Patch(':id')
  @UseGuards(AdminJwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateLabModuleDto) {
    const updatedLabModule = await this.labModuleService.update(
      Number(id),
      dto,
    );
    return new SuccessfulResponseDto(updatedLabModule);
  }
}
