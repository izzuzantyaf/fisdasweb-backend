import { Module } from '@nestjs/common';
import { LabModuleService } from './lab-module.service';
import { LabModuleController } from './lab-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabModule } from 'src/lab-module/entities';
import { LabModuleRepository } from 'src/lab-module/repo';

@Module({
  imports: [TypeOrmModule.forFeature([LabModule])],
  providers: [LabModuleService, LabModuleRepository],
  exports: [LabModuleService, LabModuleRepository],
  controllers: [LabModuleController],
})
export class LabModuleModule {}
