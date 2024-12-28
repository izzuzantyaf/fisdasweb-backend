import { UpdateResult as _UpdateResult } from 'typeorm';

export type UpdateResult = Omit<_UpdateResult, 'affected'> &
  Required<Pick<_UpdateResult, 'affected'>>;
