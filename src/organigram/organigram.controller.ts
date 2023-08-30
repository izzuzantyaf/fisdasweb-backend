import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import UpdateOrganigramDto from 'src/organigram/dto/create-organigram.dto';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { OrganigramService } from 'src/organigram/organigram.service';
import { isNumberString } from 'class-validator';

@Controller('organigram')
export class OrganigramController {
  constructor(private organigramService: OrganigramService) {}

  @Get()
  async get() {
    const organigram = await this.organigramService.get();
    return new SuccessfulResponseDto('Sukses', organigram);
  }

  @Patch(':organigramId')
  async update(
    @Param('organigramId') organigramId: string,
    @Body() updateOrganigramDto: UpdateOrganigramDto,
  ) {
    if (!isNumberString(organigramId))
      throw new BadRequestException(new ErrorResponseDto('ID tidak valid'));
    const updatedOrganigram = await this.organigramService.update(
      parseInt(organigramId),
      updateOrganigramDto,
    );
    return new SuccessfulResponseDto(
      'Organigram berhasil diupdate',
      updatedOrganigram,
    );
  }
}
