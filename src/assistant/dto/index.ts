import { Assistant } from 'src/assistant/entities';

export class AddAssistantDto {
  name: Assistant['name'];
  code: Assistant['code'];
  line_id?: Assistant['line_id'] | null;
  is_published?: Assistant['is_published'];
}

export class UpdateAssistantDto {
  name?: Assistant['name'];
  code?: Assistant['code'];
  line_id?: Assistant['line_id'] | null;
  is_published?: Assistant['is_published'];
}
