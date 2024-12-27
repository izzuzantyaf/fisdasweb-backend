import { Module } from '@nestjs/common';
import { HandoutController } from './handout.controller';
import { HandoutService } from './handout.service';
import { HandoutRepository } from 'src/handout/repo';
import { Handout } from 'src/handout/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Handout])],
  controllers: [HandoutController],
  providers: [HandoutService, HandoutRepository],
  exports: [HandoutService, HandoutRepository],
})
export class HandoutModule {}
