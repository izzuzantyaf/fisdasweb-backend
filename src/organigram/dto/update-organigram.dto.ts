import CreateOrganigramDto from 'src/organigram/dto/create-organigram.dto';

export default class UpdateOrganigramDto
  implements Partial<CreateOrganigramDto>
{
  url?: string;
}
