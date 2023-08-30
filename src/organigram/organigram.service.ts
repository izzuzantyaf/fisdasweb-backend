import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { isNotEmpty, isURL } from 'class-validator';
import { ErrorResponseDto } from 'src/common/dto/response.dto';
import isGoogleDriveLink from 'src/common/utils/is-google-drive-link.util';
import CreateOrganigramDto from 'src/organigram/dto/create-organigram.dto';
import UpdateOrganigramDto from 'src/organigram/dto/update-organigram.dto';
import { Organigram } from 'src/organigram/entities/organigram.entity';
import OrganigramPostgresRepository from 'src/organigram/repo/organigram-postgres.repo';
import organigramSeed from 'src/organigram/seed/organigram.seed';

@Injectable()
export class OrganigramService implements OnModuleInit {
  private readonly logger = new Logger(OrganigramService.name);

  constructor(private organigramRepository: OrganigramPostgresRepository) {}

  onModuleInit() {
    this.seed(organigramSeed[0]);
    return;
    throw new Error('Method not implemented.');
  }

  private async seed(organigramSeed: CreateOrganigramDto) {
    const organigram = await this.organigramRepository.get();
    if (organigram.length) return;
    await this.create(organigramSeed);
    this.logger.log(`Organigram seeded successfully`);
    return;
  }

  async create(createOrganigramDto: CreateOrganigramDto) {
    this.logger.debug(
      `createOrganigramDto: ${JSON.stringify(createOrganigramDto)}`,
    );

    if (isNotEmpty(createOrganigramDto.url)) {
      if (!isURL(createOrganigramDto.url))
        throw new BadRequestException(new ErrorResponseDto('URL tidak valid'));
      if (isGoogleDriveLink(createOrganigramDto.url)) {
        createOrganigramDto.url = createOrganigramDto.url.replace(
          'view',
          'preview',
        );
      }
    }
    const storedOrganigram =
      await this.organigramRepository.store(createOrganigramDto);
    this.logger.log(
      `Organigram stored ${JSON.stringify({
        id: storedOrganigram.id,
      })}`,
    );
    return storedOrganigram;
  }

  async get() {
    const organigram = await this.organigramRepository.get();
    return organigram;
  }

  async update(id: Organigram['id'], updateOrganigramDto: UpdateOrganigramDto) {
    this.logger.debug(
      `updateOrganigramDto: ${JSON.stringify(updateOrganigramDto)}`,
    );
    if (isNotEmpty(updateOrganigramDto.url)) {
      if (!isURL(updateOrganigramDto.url))
        throw new BadRequestException(new ErrorResponseDto('URL tidak valid'));
      if (isGoogleDriveLink(updateOrganigramDto.url)) {
        updateOrganigramDto.url = updateOrganigramDto.url.replace(
          'view',
          'preview',
        );
      }
    }

    const updatedOrganigram = await this.organigramRepository.updateById(
      id,
      updateOrganigramDto,
    );
    this.logger.log(
      `Organigram update success ${JSON.stringify({
        id: updatedOrganigram.id,
      })}`,
    );
    return updatedOrganigram;
  }
}
