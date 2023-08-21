import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth-guard';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('admin/register')
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    const storedAdmin = await this.authService.registerAdmin(createAdminDto);
    // Omit the password from the response even though it's already hashed, just for security reason
    delete storedAdmin.password;
    return new SuccessfulResponseDto('Registrasi berhasil', storedAdmin);
  }

  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async signin(@Request() req) {
    this.logger.debug(`Request.body: ${JSON.stringify(req.body)}`);
    this.logger.debug(`Request.user: ${JSON.stringify(req.user)}`);
    const result = await this.authService.generateAdminJwt(req.user);
    return new SuccessfulResponseDto('Login berhasil', result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile() {
    return {
      profile: 'asfsaflaksfjskl',
    };
  }
}
