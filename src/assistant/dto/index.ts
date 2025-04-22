import { Assistant } from 'src/assistant/entities';
import { SortOrder } from 'src/common/types';

export class AddAssistantDto {
  name: Assistant['name'];
  code: Assistant['code'];
  level: Assistant['level'];
  line_id?: Assistant['line_id'] | null;
  is_published?: Assistant['is_published'];
}

export class UpdateAssistantDto {
  name?: Assistant['name'];
  code?: Assistant['code'];
  level?: Assistant['level'];
  line_id?: Assistant['line_id'] | null;
  is_published?: Assistant['is_published'];
}

export type AssistantSortKey = keyof Pick<
  Assistant,
  'name' | 'code' | 'level' | 'line_id'
>;

type Sort = `${AssistantSortKey}-${SortOrder}`;

export interface GetAssistantQueryParams {
  sort?: Sort;
  search?: string;
  level?: Assistant['level'];
}
