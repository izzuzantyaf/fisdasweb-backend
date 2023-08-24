import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ADMIN_JWT_STRATEGY_NAME } from '../constants';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(
  Strategy,
  ADMIN_JWT_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
