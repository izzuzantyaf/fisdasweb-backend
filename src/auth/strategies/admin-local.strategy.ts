import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ErrorResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ userNameField: 'email' });
  }

  async validate(email: string, password: string) {
    const admin = await this.authService.loginAdminUsingLocalStrategy(
      email,
      password,
    );
    return admin;
  }
}
