import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from '../admin/dto';
import AdminPostgresRepository from '../admin/repo';
import { ErrorResponseDto } from '../common/dto/response.dto';
import * as bcrypt from 'bcrypt';
import Admin from '../admin/entities';
import { ACCESS_TOKEN_LIFETIME_IN_MILLISECONDS } from 'src/auth/constant';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private adminRepository: AdminPostgresRepository,
  ) {}

  async registerAdmin(data: CreateAdminDto) {
    try {
      const NAME_MIN_LENGTH = 1;
      const NAME_MAX_LENGTH = 255;

      if (
        data.name.length < NAME_MIN_LENGTH ||
        data.name.length > NAME_MAX_LENGTH
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`,
          ),
        );
      }

      const USERNAME_MIN_LENGTH = 1;
      const USERNAME_MAX_LENGTH = 32;

      if (
        data.username.length < USERNAME_MIN_LENGTH ||
        data.username.length > USERNAME_MAX_LENGTH
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters`,
          ),
        );
      }

      const ALPHANUMERIC_UNDERSCORE_DOT_HYPEN_REGEX = /^[a-zA-Z0-9_.-]+$/;

      if (!ALPHANUMERIC_UNDERSCORE_DOT_HYPEN_REGEX.test(data.username)) {
        throw new BadRequestException(
          new ErrorResponseDto(
            'Username can only contain letters, numbers, underscores, dots, and hyphens',
          ),
        );
      }

      const PASSWORD_MIN_LENGTH = 8;
      const PASSWORD_MAX_LENGTH = 16;

      if (
        data.password.length < PASSWORD_MIN_LENGTH ||
        data.password.length > PASSWORD_MAX_LENGTH
      ) {
        throw new BadRequestException(
          new ErrorResponseDto(
            `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`,
          ),
        );
      }

      const isUsernameUsed = await this.adminRepository.checkIsExistByUsername(
        data.username,
      );

      if (isUsernameUsed) {
        throw new BadRequestException(
          new ErrorResponseDto('Username is already used'),
        );
      }

      const SALT_ROUNDS = 10;
      const hashedPassword = bcrypt.hashSync(data.password, SALT_ROUNDS);

      data.password = hashedPassword;
      const storedAdmin = await this.adminRepository.store(data);

      this.logger.log(
        JSON.stringify({
          event: 'Admin registered',
          timestamp: new Date().toISOString(),
          data: {
            id: storedAdmin.id,
          },
        }),
      );

      return storedAdmin;
    } catch (error) {
      this.logger.debug(
        JSON.stringify({
          event: 'Admin registration failed',
          timestamp: new Date().toISOString(),
          error: error,
        }),
      );

      throw error;
    }
  }

  async loginAdminUsingLocalStrategy(username: string, password: string) {
    try {
      const admin = await this.adminRepository.getByUsername(username);
      if (!admin) {
        throw new UnauthorizedException(new ErrorResponseDto('login failed'));
      }

      const isPasswordMatch = bcrypt.compareSync(password, admin.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException(new ErrorResponseDto('login failed'));
      }

      return admin;
    } catch (error) {
      this.logger.debug(`Admin login failed: ${JSON.stringify({ username })}`);
      throw error;
    }
  }

  async generateAdminJwt(admin: Admin) {
    try {
      delete admin.password;

      const payload = { ...admin };

      const access_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: ACCESS_TOKEN_LIFETIME_IN_MILLISECONDS / 1000,
      });

      return access_token;
    } catch (error) {
      throw error;
    }
  }

  validateApiKey(apiKey: string) {
    const isApiKeyValid = apiKey === process.env.API_KEY;
    return isApiKeyValid;
  }
}
