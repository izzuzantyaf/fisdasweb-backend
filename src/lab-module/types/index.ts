import { LabModule } from 'src/lab-module/entities';

export type AddLabModuleParam = Required<
  Pick<LabModule, 'name' | 'code' | 'language'>
> &
  Partial<
    Pick<
      LabModule,
      | 'pretask_url'
      | 'is_pretask_visible'
      | 'video_url'
      | 'is_video_visible'
      | 'journal_cover_url'
      | 'is_journal_cover_visible'
      | 'simulator_url'
      | 'is_simulator_visible'
    >
  >;

export type UpdateLabModuleParam = Partial<
  Pick<
    LabModule,
    | 'name'
    | 'code'
    | 'language'
    | 'pretask_url'
    | 'is_pretask_visible'
    | 'video_url'
    | 'is_video_visible'
    | 'journal_cover_url'
    | 'is_journal_cover_visible'
    | 'simulator_url'
    | 'is_simulator_visible'
  >
>;
