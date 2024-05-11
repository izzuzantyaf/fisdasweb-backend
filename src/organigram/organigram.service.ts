import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isURL } from 'class-validator';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { CreateOrganigramDto, UpdateOrganigramDto } from 'src/organigram/dto';
import { Organigram } from 'src/organigram/entities';
import { OrganigramPostgresRepository } from 'src/organigram/repo';

@Injectable()
export class OrganigramService {
  private readonly logger = new Logger(OrganigramService.name);

  constructor(private organigramRepository: OrganigramPostgresRepository) {}

  async create(data: CreateOrganigramDto) {
    this.logger.debug(`createOrganigramDto: ${JSON.stringify(data)}`);

    if (data.url && !isURL(data.url))
      throw new BadRequestException(
        new ErrorResponseDto('create organigram failed', {
          url: 'url is invalid',
        }),
      );

    const storedOrganigram = await this.organigramRepository.store(data);

    return storedOrganigram;
  }

  async get() {
    const organigram = await this.organigramRepository.find();
    return organigram;
  }

  async update(id: Organigram['id'], data: UpdateOrganigramDto) {
    this.logger.debug(`updateOrganigramDto: ${JSON.stringify(data)}`);

    if (data.url && !isURL(data.url))
      throw new BadRequestException(
        new ErrorResponseDto('update organigram failed', {
          url: 'url is invalid',
        }),
      );

    const updatedOrganigram = await this.organigramRepository.update(id, data);

    return updatedOrganigram;
  }
}
