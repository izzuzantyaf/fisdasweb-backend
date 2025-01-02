import { SortOrder } from 'src/common/types';
import { Handout } from 'src/handout/entities';

export interface AddHandoutDto {
  name: string;
  link: string;
  is_published?: boolean;
}

export type HandoutSortKey = keyof Pick<Handout, 'created_at' | 'is_published'>;

type Sort = `${HandoutSortKey}-${SortOrder}`;

export interface GetHandoutQueryParams {
  sort?: Sort;
  search?: string;
}

export interface UpdateHandoutDto {
  name?: string;
  link?: string;
  is_published?: boolean;
}
