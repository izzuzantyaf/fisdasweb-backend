import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import RegisterAdminValidationHelper from './helpers/register-admin-validation.helper';
import AdminPostgresRepository from '../admin/repo/admin-postgres.repo';
import { ErrorResponseDto } from '../common/dto/response.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private adminRepository: AdminPostgresRepository,
  ) {}

  /**
   * ## Register new admin
   *
   * ### Steps:
   * 1. Validate admin data
   * 2. Check if admin email already exists
   * 3. Hash admin password
   * 4. Store admin data
   *
   * @param createAdminDto Admin data
   * @returns
   */
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
          new ErrorResponseDto('Registrasi gagal', {
            errors,
          }),
        );
      }

      const isEmailRegistered = await this.adminRepository.checkIsExistByEmail(
        createAdminDto.email,
      );
      if (isEmailRegistered) {
        throw new BadRequestException(
          new ErrorResponseDto('Registrasi gagal', {
            errors: {
              email: 'Email sudah terdaftar',
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
      this.logger.log(
        `New admin registered: ${JSON.stringify({ id: storedAdmin.id })}`,
      );

      return storedAdmin;
    } catch (error) {
      this.logger.debug(
        `Admin register error: ${JSON.stringify({
          email: createAdminDto.email,
        })}`,
      );
      throw error;
    }
  }

  /**
   * ## Login admin using local strategy
   *
   * ### Steps:
   * 1. Get admin by email
   * 2. Compare password
   * 3. Return admin data
   *
   * @param email Admin's email
   * @param password Admin's plain password
   * @returns
   */
  async loginAdminUsingLocalStrategy(email: string, password: string) {
    try {
      const admin = await this.adminRepository.getByEmail(email);
      if (!admin) {
        throw new UnauthorizedException(new ErrorResponseDto('Login gagal'));
      }

      const isPasswordMatch = bcrypt.compareSync(password, admin.password);
      if (!isPasswordMatch) {
        throw new UnauthorizedException(new ErrorResponseDto('Login gagal'));
      }

      return admin;
    } catch (error) {
      this.logger.log(`Admin login failed: ${JSON.stringify({ email })}`);
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
      this.logger.log(
        `Admin access token generated: ${JSON.stringify({
          admin_id: admin.id,
          strategy: 'jwt',
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
}
