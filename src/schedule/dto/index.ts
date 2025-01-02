import { SortOrder } from 'src/common/types';
import { Schedule } from 'src/schedule/entities';

export interface AddScheduleDto {
  name: string;
  link: string;
  is_published?: boolean;
}

export type ScheduleSortKey = keyof Pick<
  Schedule,
  'created_at' | 'is_published'
>;

type Sort = `${ScheduleSortKey}-${SortOrder}`;

export interface GetScheduleQueryParams {
  sort?: Sort;
  search?: string;
}

export interface UpdateScheduleDto {
  name?: string;
  link?: string;
  is_published?: boolean;
}
