import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdateOrganigramDto } from 'src/organigram/dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { OrganigramService } from 'src/organigram/organigram.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import ApiKeyGuard from 'src/auth/guard/api-key.guard';

@Controller('organigram')
export class OrganigramController {
  constructor(private organigramService: OrganigramService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  async get() {
    const organigram = await this.organigramService.get();
    return new SuccessfulResponseDto('success', organigram);
  }

  @Patch(':id')
  @UseGuards(AdminJwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateOrganigramDto) {
    const updatedOrganigram = await this.organigramService.update(
      parseInt(id),
      dto,
    );

    return new SuccessfulResponseDto('updated successfully', updatedOrganigram);
  }
}
