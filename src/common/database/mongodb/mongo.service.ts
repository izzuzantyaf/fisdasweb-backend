import { Injectable } from '@nestjs/common';
import { AssistantRepository } from 'src/assistant/repo';

@Injectable()
export class MongoService {
  assistants: AssistantRepository;

  constructor() {}
}
