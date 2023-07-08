import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isNotEmpty } from 'class-validator';
import {
  CreateAssistantDto,
  UpdateAssistantDto,
} from 'src/assistant/dto/assistant.dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AssistantService } from 'src/assistant/assistant.service';

@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private assistantService: AssistantService) {}

  @Post()
  async create(@Body() createAssistantDto: CreateAssistantDto) {
    const storedAssistant = await this.assistantService.create(
      createAssistantDto,
    );
    return new SuccessfulResponseDto(
      'Asisten berhasil ditambahkan',
      storedAssistant,
    );
  }

  @Get()
  async getAll(@Query('keyword') keyword?: string) {
    const assistants = isNotEmpty(keyword)
      ? await this.assistantService.search(keyword)
      : await this.assistantService.getAll();
    return new SuccessfulResponseDto('Sukses', assistants);
  }

  @Put()
  async update(@Body() updateAssistantDto: UpdateAssistantDto) {
    const updatedAssistant = await this.assistantService.update(
      updateAssistantDto,
    );
    return new SuccessfulResponseDto(
      'Asisten berhasil diupdate',
      updatedAssistant,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedAssistant = await this.assistantService.delete(id);
    return new SuccessfulResponseDto(
      'Asisten berhasil dihapus',
      deletedAssistant,
    );
  }

  @Delete()
  async deleteMany(@Body() deleteAdminsDto: { ids: string[] }) {
    const deletedAdmins = await this.assistantService.deleteMany(
      deleteAdminsDto.ids,
    );
    return new SuccessfulResponseDto(
      `${deletedAdmins.length} asisten berhasil dihapus`,
      {
        deletedAdmins,
      },
    );
  }
}
