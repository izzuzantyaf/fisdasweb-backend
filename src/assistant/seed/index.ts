import { faker } from '@faker-js/faker';
import { AssistantLevel } from 'src/assistant/constants';
import { Gender } from 'src/common/constants';

export const assistantSeeder = Array(50)
  .fill(null)
  .map(() => ({
    name: faker.person.fullName(),
    code: faker.string.alpha(3).toUpperCase(),
    phone: faker.phone.number('08##########'),
    line_id: faker.internet.userName(),
    gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
    level: Math.random() > 0.5 ? AssistantLevel.SENIOR : AssistantLevel.JUNIOR,
    feedback_url: faker.internet.url(),
    image_url: faker.image.avatar(),
  }));
