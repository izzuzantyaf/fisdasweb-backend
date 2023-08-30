import CreateOrganigramDto from 'src/organigram/dto/create-organigram.dto';
import UpdateOrganigramDto from 'src/organigram/dto/update-organigram.dto';
import { Organigram } from 'src/organigram/entities/organigram.entity';

export default interface IOrganigramRepository {
  store(organigram: CreateOrganigramDto): Promise<Organigram>;
  get(): Promise<Organigram[]>;
  updateById(
    id: Organigram['id'],
    organigram: UpdateOrganigramDto,
  ): Promise<Organigram>;
}
