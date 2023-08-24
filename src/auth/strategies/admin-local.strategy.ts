import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ADMIN_LOCAL_STRATEGY_NAME } from '../constants';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  ADMIN_LOCAL_STRATEGY_NAME,
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const admin = await this.authService.loginAdminUsingLocalStrategy(
      email,
      password,
    );
    return admin;
  }
}
