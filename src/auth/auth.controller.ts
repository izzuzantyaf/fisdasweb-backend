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
import { SuccessfulResponseDto } from 'src/common/dto/response.dto';
import { AuthService } from 'src/auth/auth.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { AdminLocalAuthGuard } from 'src/auth/guard/admin-local-auth-guard';
import { CreateAdminDto } from '../admin/dto';
import ApiKeyGuard from 'src/auth/guard/api-key.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('admin/register')
  @UseGuards(ApiKeyGuard)
  async registerAdmin(@Body() dto: CreateAdminDto) {
    await this.authService.registerAdmin(dto);
    return new SuccessfulResponseDto();
  }

  @Post('admin/login')
  @UseGuards(AdminLocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async signin(@Request() req) {
    this.logger.debug(`Request.body: ${JSON.stringify(req.body)}`);
    this.logger.debug(`Request.user: ${JSON.stringify(req.user)}`);
    const result = await this.authService.generateAdminJwt(req.user);
    return new SuccessfulResponseDto(result);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('admin/me')
  async profile(@Req() req: any) {
    return new SuccessfulResponseDto(req.user);
  }
}
