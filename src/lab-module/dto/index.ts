import { LabModule } from 'src/lab-module/entities';

export class AddLabModuleDto {
  name: LabModule['name'];
  code: LabModule['code'];
  language: LabModule['language'];
}

export class UpdateLabModuleDto {
  name?: LabModule['name'];
  code?: LabModule['code'];
  language?: LabModule['language'];
  pretask_url?: LabModule['pretask_url'];
  is_pretask_visible?: LabModule['is_pretask_visible'];
  video_url?: LabModule['video_url'];
  is_video_visible?: LabModule['is_video_visible'];
  simulator_url?: LabModule['simulator_url'];
  is_simulator_visible?: LabModule['is_simulator_visible'];
  journal_cover_url?: LabModule['journal_cover_url'];
  is_journal_cover_visible?: LabModule['is_journal_cover_visible'];
}
