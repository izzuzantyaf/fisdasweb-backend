import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AuthService } from 'src/auth/auth.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { AdminLocalAuthGuard } from 'src/auth/guard/admin-local-auth-guard';
import { CreateAdminDto } from '../admin/dto';
import ApiKeyGuard from 'src/auth/guard/api-key.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('admin/register')
  @UseGuards(ApiKeyGuard)
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    const storedAdmin = await this.authService.registerAdmin(createAdminDto);
    // Omit the password from the response even though it's already hashed, just for security reason
    delete storedAdmin.password;
    return new SuccessfulResponseDto('admin registered', storedAdmin);
  }

  @Post('admin/login')
  @UseGuards(AdminLocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async signin(@Request() req) {
    this.logger.debug(`Request.body: ${JSON.stringify(req.body)}`);
    this.logger.debug(`Request.user: ${JSON.stringify(req.user)}`);
    const result = await this.authService.generateAdminJwt(req.user);
    return new SuccessfulResponseDto('login successfully', result);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('admin/me')
  async profile(@Req() req: any) {
    return new SuccessfulResponseDto('success', req.user);
  }
}
