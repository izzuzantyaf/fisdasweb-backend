import { Assistant } from 'src/assistant/entities';

export class CreateAssistantDto {
  name: Assistant['name'];
  code: Assistant['code'];
  phone?: Assistant['phone'];
  line_id?: Assistant['line_id'];
  gender: Assistant['gender'];
  level: Assistant['level'];
  feedback_url?: Assistant['feedback_url'];
  image_url?: Assistant['image_url'];
}

export class UpdateAssistantDto {
  name: Assistant['name'];
  code: Assistant['code'];
  phone?: Assistant['phone'];
  line_id?: Assistant['line_id'];
  gender: Assistant['gender'];
  level: Assistant['level'];
  feedback_url?: Assistant['feedback_url'];
  image_url?: Assistant['image_url'];
}
