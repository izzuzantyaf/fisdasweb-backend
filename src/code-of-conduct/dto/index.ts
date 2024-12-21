import { CodeOfConduct } from 'src/code-of-conduct/entities';

export class UpdateCodeOfConductDto {
  link?: CodeOfConduct['link'] | null;
  is_published?: CodeOfConduct['is_published'];
}
