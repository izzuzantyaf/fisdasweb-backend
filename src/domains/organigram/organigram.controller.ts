import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrganigramDto } from 'src/domains/organigram/dto/organigram.dto';
import { SuccessfulResponseDto } from 'src/domains/common/dto/response.dto';
import { OrganigramService } from 'src/domains/organigram/organigram.service';

@ApiTags('organigram')
@Controller('organigram')
export class OrganigramController {
  constructor(private organigramService: OrganigramService) {}

  @Get()
  async getAll() {
    const organigram = await this.organigramService.getOne();
    return new SuccessfulResponseDto('Sukses', organigram);
  }

  @Put()
  async update(@Body() updateOrganigramDto: UpdateOrganigramDto) {
    const updatedOrganigram = await this.organigramService.update(
      updateOrganigramDto,
    );
    return new SuccessfulResponseDto(
      'Organigram berhasil diupdate',
      updatedOrganigram,
    );
  }
}
