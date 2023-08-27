import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from 'src/auth/auth.service';
import { API_KEY_STRAEGY_NAME } from 'src/auth/constants';

@Injectable()
export default class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  API_KEY_STRAEGY_NAME,
) {
  constructor(private authService: AuthService) {
    super(
      {
        header: 'Api-Key',
      },
      true,
      async (apiKey, done) => {
        if (this.authService.validateApiKey(apiKey)) {
          done(null, true);
        }
        done(new UnauthorizedException(), null);
      },
    );
  }
}
