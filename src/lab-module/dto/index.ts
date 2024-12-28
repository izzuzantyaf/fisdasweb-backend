import { LabModule } from 'src/lab-module/entities';

export class AddLabModuleDto {
  name: LabModule['name'];
  code: LabModule['code'];
  pretask_link?: LabModule['pretask_link'] | null;
  pretask_is_published?: LabModule['pretask_is_published'];
  video_link?: LabModule['video_link'] | null;
  video_is_published?: LabModule['video_is_published'];
  simulator_link?: LabModule['simulator_link'] | null;
  simulator_is_published?: LabModule['simulator_is_published'];
  journal_cover_link?: LabModule['journal_cover_link'] | null;
  journal_cover_is_published?: LabModule['journal_cover_is_published'];
}

export class UpdateLabModuleDto {
  name?: LabModule['name'];
  code?: LabModule['code'];
  pretask_link?: LabModule['pretask_link'] | null;
  pretask_is_published?: LabModule['pretask_is_published'];
  video_link?: LabModule['video_link'] | null;
  video_is_published?: LabModule['video_is_published'];
  simulator_link?: LabModule['simulator_link'] | null;
  simulator_is_published?: LabModule['simulator_is_published'];
  journal_cover_link?: LabModule['journal_cover_link'] | null;
  journal_cover_is_published?: LabModule['journal_cover_is_published'];
}
