import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from '../admin/dto';
import RegisterAdminValidationHelper from './helper/register-admin-validation.helper';
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

  async registerAdmin(createAdminDto: CreateAdminDto) {
    try {
      this.logger.debug(`createAdminDto: ${JSON.stringify(createAdminDto)}`);

      const registerAdminValidationHelper = new RegisterAdminValidationHelper();
      const validationResult =
        registerAdminValidationHelper.validateCreateAdminDto(createAdminDto);

      if (!validationResult.isSafe) {
        const errors = {};
        for (const key in validationResult.result) {
          const element = validationResult.result[key];
          if (element !== true) {
            errors[key] = element;
          }
        }
        throw new BadRequestException(
          new ErrorResponseDto('admin register failed', {
            errors,
          }),
        );
      }

      const isUsernameRegistered =
        await this.adminRepository.checkIsExistByUsername(
          createAdminDto.username,
        );
      if (isUsernameRegistered) {
        throw new BadRequestException(
          new ErrorResponseDto('admin register failed', {
            errors: {
              username: 'username is already registered',
            },
          }),
        );
      }

      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(
        createAdminDto.password,
        saltRounds,
      );

      createAdminDto.password = hashedPassword;
      const storedAdmin = await this.adminRepository.store(createAdminDto);

      return storedAdmin;
    } catch (error) {
      this.logger.debug(`Admin register error: ${JSON.stringify(error)}`);
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
