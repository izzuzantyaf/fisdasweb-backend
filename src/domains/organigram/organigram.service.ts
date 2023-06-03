import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { MongoService } from 'src/infrastructure/database/mongodb/mongo.service';
import { ErrorResponseDto } from 'src/domains/common/dto/response.dto';
import { OrganigramFactoryService } from './organigram-factory.service';
import { UpdateOrganigramDto } from 'src/domains/organigram/dto/organigram.dto';

@Injectable()
export class OrganigramService {
  private readonly logger = new Logger(OrganigramService.name);

  constructor(
    private dataService: MongoService,
    private organigramFactory: OrganigramFactoryService,
  ) {}

  async getOne() {
    const organigram = this.organigramFactory.create(
      await this.dataService.organigrams.getFirst(),
    );
    return organigram;
  }

  async update(updateOrganigramDto: UpdateOrganigramDto) {
    this.logger.debug(
      `updateOrganigramDto ${JSON.stringify(
        updateOrganigramDto,
        undefined,
        2,
      )}`,
    );
    const newOrganigram = this.organigramFactory.create(updateOrganigramDto);
    const validationError = newOrganigram.validateProps();
    if (isNotEmpty(validationError)) {
      this.logger.log(
        `Organigram data is not valid ${JSON.stringify(validationError)}`,
      );
      throw new BadRequestException(
        new ErrorResponseDto('Data tidak valid', { validationError }),
      );
    }
    const updateResult = await this.dataService.organigrams.updateById(
      newOrganigram._id,
      newOrganigram,
    );
    if (isEmpty(updateResult)) {
      this.logger.log(
        `Organigram update failed ${JSON.stringify({
          organigramId: updateOrganigramDto._id,
        })}`,
      );
      throw new BadRequestException(
        new ErrorResponseDto('Organigram gagal diupdate'),
      );
    }
    this.logger.debug(
      `Updated organigram ${JSON.stringify(updateResult, undefined, 2)}`,
    );
    this.logger.log(
      `Organigram update success ${JSON.stringify({
        organigramId: updateResult._id,
      })}`,
    );
    const updatedOrganigram = this.organigramFactory.create(updateResult);
    return updatedOrganigram;
  }
}
