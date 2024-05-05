import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeOfConduct } from 'src/code-of-conduct/entity';
import { CodeOfConductController } from 'src/code-of-conduct/code-of-conduct.controller';
import { CodeOfConductService } from 'src/code-of-conduct/code-of-conduct.service';
import { CodeOfConductRepository } from 'src/code-of-conduct/repo';

@Module({
  imports: [TypeOrmModule.forFeature([CodeOfConduct])],
  providers: [CodeOfConductService, CodeOfConductRepository],
  controllers: [CodeOfConductController],
  exports: [CodeOfConductService, CodeOfConductRepository],
})
export class CodeOfConductModule {}
