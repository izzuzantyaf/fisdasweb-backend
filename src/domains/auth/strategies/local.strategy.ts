import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ErrorResponseDto } from 'src/domains/common/dto/response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ userNameField: 'email' });
  }

  async validate(email: string, password: string) {
    const admin = await this.authService.validateAdmin(email, password);
    if (!admin)
      throw new UnauthorizedException(new ErrorResponseDto('Login gagal'));
    return admin;
  }
}
