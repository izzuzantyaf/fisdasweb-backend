import { Organigram } from 'src/organigram/entities';

export class UpdateOrganigramDto {
  link?: Organigram['link'] | null;
  is_published?: Organigram['is_published'];
}
