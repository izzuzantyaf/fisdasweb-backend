import { Organigram } from 'src/organigram/entities/organigram.entity';

export default class CreateOrganigramDto
  implements
    Omit<Organigram, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
{
  url?: string;
}
