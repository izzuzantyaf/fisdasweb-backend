import { Injectable, Logger } from '@nestjs/common';
import { UpdateOrganigramDto } from 'src/organigram/dto';
import { Organigram } from 'src/organigram/entities';
import { OrganigramRepository } from 'src/organigram/repo';

@Injectable()
export class OrganigramService {
  private readonly logger = new Logger(OrganigramService.name);

  constructor(private organigramRepository: OrganigramRepository) {}

  async get() {
    const organigrams = await this.organigramRepository.find({
      select: ['id', 'link', 'is_published'],
      take: 1,
      order: {
        id: 'asc',
      },
    });

    return organigrams[0] || null;
  }

  async getPublished() {
    const organigrams = await this.organigramRepository.find({
      select: ['id', 'link', 'is_published'],
      where: { is_published: true },
      take: 1,
      order: {
        id: 'asc',
      },
    });

    return organigrams[0] || null;
  }

  async update(id: Organigram['id'], data: UpdateOrganigramDto) {
    const updatedOrganigram = await this.organigramRepository.update(id, data, {
      returning: ['id', 'link', 'is_published'],
    });

    return updatedOrganigram;
  }
}
