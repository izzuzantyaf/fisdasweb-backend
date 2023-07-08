import { Controller } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';

@Controller('api/social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}
}
