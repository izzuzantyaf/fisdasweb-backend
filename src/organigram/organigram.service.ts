import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { isURL } from 'class-validator';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import { CreateOrganigramDto, UpdateOrganigramDto } from 'src/organigram/dto';
import { Organigram } from 'src/organigram/entities';
import { OrganigramPostgresRepository } from 'src/organigram/repo';
import { organigramSeed } from 'src/organigram/seed';

@Injectable()
export class OrganigramService implements OnModuleInit {
  private readonly logger = new Logger(OrganigramService.name);

  constructor(private organigramRepository: OrganigramPostgresRepository) {}

  onModuleInit() {
    this.seed();
    return;
    throw new Error('Method not implemented.');
  }

  private async seed() {
    const organigram = await this.organigramRepository.find();
    if (organigram.length) return;
    await this.create(organigramSeed[0]);
    this.logger.log(`Organigram seeded successfully`);
    return;
  }

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
