import { Organigram } from 'src/organigram/entities/organigram.entity';

export class CreateOrganigramDto {
  url?: Organigram['url'];
}

export class UpdateOrganigramDto {
  url?: Organigram['url'];
}
