import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isURL } from 'class-validator';
import {
  CreateCodeOfConductDto,
  UpdateCodeOfConductDto,
} from 'src/code-of-conduct/dto';
import { CodeOfConduct } from 'src/code-of-conduct/entities';
import { CodeOfConductRepository } from 'src/code-of-conduct/repo';
import { ErrorResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class CodeOfConductService {
  private readonly logger = new Logger(CodeOfConductService.name);

  constructor(private codeOfConductRepository: CodeOfConductRepository) {}

  async create(data: CreateCodeOfConductDto) {
    this.logger.debug(`createCodeOfConductDto: ${JSON.stringify(data)}`);

    if (data.url && !isURL(data.url))
      throw new BadRequestException(
        new ErrorResponseDto('create code of conduct failed', {
          url: 'url is invalid',
        }),
      );

    const storedCodeOfConduct = await this.codeOfConductRepository.store(data);

    return storedCodeOfConduct;
  }

  async get() {
    const codeofconduct = await this.codeOfConductRepository.find();
    return codeofconduct;
  }

  async update(id: CodeOfConduct['id'], data: UpdateCodeOfConductDto) {
    this.logger.debug(`updateCodeOfConductDto: ${JSON.stringify(data)}`);

    if (data.url && !isURL(data.url))
      throw new BadRequestException(
        new ErrorResponseDto('update code of conduct failed', {
          url: 'url is invalid',
        }),
      );

    const updatedCodeOfConduct = await this.codeOfConductRepository.update(
      id,
      data,
    );

    return updatedCodeOfConduct;
  }
}
