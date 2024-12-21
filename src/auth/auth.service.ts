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

  /**
   * ## Login admin using local strategy
   *
   * ### Steps:
   * 1. Get admin by username
   * 2. Compare password
   * 3. Return admin data
   *
   * @param username Admin's username
   * @param password Admin's plain password
   * @returns
   */
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

  /**
   * ## Generate admin jwt
   *
   * ### Steps:
   * 1. Delete admin password
   * 2. Generate jwt
   * 3. Return admin data and jwt
   *
   * @param admin Admin
   * @returns
   */
  async generateAdminJwt(admin: Admin) {
    try {
      delete admin.password;
      const payload = { ...admin };
      this.logger.debug(`Admin jwt payload: ${JSON.stringify(payload)}`);
      const access_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      });
      this.logger.debug(
        `Admin access token generated: ${JSON.stringify({
          admin_id: admin.id,
          strategy: 'jwt',
          access_token,
        })}`,
      );

      return {
        admin,
        access_token,
      };
    } catch (error) {
      throw error;
    }
  }

  validateApiKey(apiKey: string) {
    const isApiKeyValid = apiKey === process.env.API_KEY;
    return isApiKeyValid;
  }
}
