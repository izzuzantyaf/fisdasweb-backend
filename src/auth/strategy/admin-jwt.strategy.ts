import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_NAME, ADMIN_JWT_STRATEGY_NAME } from '../constant';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(
  Strategy,
  ADMIN_JWT_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: extractFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

function extractFromCookie(req: Request & { cookies: Record<string, string> }) {
  return req?.cookies?.[ACCESS_TOKEN_NAME] || null;
}
