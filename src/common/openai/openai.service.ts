import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAIService {
  openAIApi: OpenAIApi;

  constructor() {
    const openAIConfig = new Configuration({
      organization: process.env.OPENAI_ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAIApi = new OpenAIApi(openAIConfig);
  }
}
