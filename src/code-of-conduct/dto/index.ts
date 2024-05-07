import { CodeOfConduct } from 'src/code-of-conduct/entities';

export class CreateCodeOfConductDto {
  url?: CodeOfConduct['url'];
}

export class UpdateCodeOfConductDto {
  url?: CodeOfConduct['url'];
}
