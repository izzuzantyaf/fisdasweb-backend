import { Injectable, Logger } from '@nestjs/common';
import { Language, createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

@Injectable()
export class UnsplashService {
  private logger = new Logger(UnsplashService.name);
  public unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    // fetch: nodeFetch as unknown as typeof fetch,
    fetch: nodeFetch as unknown as typeof fetch,
  });

  async searchPhotos(query: string, options: { lang?: Language } = {}) {
    try {
      const unsplashResponse = await this.unsplashApi.search.getPhotos({
        query,
        page: 1,
        perPage: 1,
        orientation: 'landscape',
        lang: options.lang ?? Language.English,
      });
      return unsplashResponse.response;
    } catch (error) {
      this.logger.debug('Error searching photos from Unsplash:', error);
      throw error;
    }
  }
}
