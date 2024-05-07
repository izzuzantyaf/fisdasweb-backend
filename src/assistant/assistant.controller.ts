import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isNotEmpty } from 'class-validator';
import { CreateAssistantDto, UpdateAssistantDto } from 'src/assistant/dto';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AssistantService } from 'src/assistant/assistant.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import ApiKeyGuard from 'src/auth/guard/api-key.guard';

@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private assistantService: AssistantService) {}

  @Post()
  @UseGuards(AdminJwtAuthGuard)
  async create(@Body() createAssistantDto: CreateAssistantDto) {
    const storedAssistant =
      await this.assistantService.create(createAssistantDto);
    return new SuccessfulResponseDto('success', storedAssistant);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  async getAll(@Query('keyword') keyword?: string) {
    const assistants = isNotEmpty(keyword)
      ? await this.assistantService.search(keyword)
      : await this.assistantService.getAll();
    return new SuccessfulResponseDto('success', assistants);
  }

  @Put(':id')
  @UseGuards(AdminJwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAssistantDto: UpdateAssistantDto,
  ) {
    const updatedAssistant = await this.assistantService.update(
      Number(id),
      updateAssistantDto,
    );
    return new SuccessfulResponseDto('success', updatedAssistant);
  }

  @Delete(':id')
  @UseGuards(AdminJwtAuthGuard)
  async delete(@Param('id') id: string) {
    const deletedAssistant = await this.assistantService.delete(Number(id));
    return new SuccessfulResponseDto('success', deletedAssistant);
  }
}
