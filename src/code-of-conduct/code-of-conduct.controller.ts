import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import ApiKeyGuard from 'src/auth/guard/api-key.guard';
import { CodeOfConductService } from 'src/code-of-conduct/code-of-conduct.service';
import { UpdateCodeOfConductDto } from 'src/code-of-conduct/dto';

@Controller('code-of-conduct')
export class CodeOfConductController {
  constructor(private codeOfConductService: CodeOfConductService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  async get() {
    const codeOfConduct = await this.codeOfConductService.get();
    return new SuccessfulResponseDto('success', codeOfConduct);
  }

  @Patch(':id')
  @UseGuards(AdminJwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateCodeOfConductDto) {
    const updatedCodeOfCondcut = await this.codeOfConductService.update(
      parseInt(id),
      dto,
    );

    return new SuccessfulResponseDto(
      'updated successfully',
      updatedCodeOfCondcut,
    );
  }
}
