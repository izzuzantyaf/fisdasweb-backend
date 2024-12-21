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
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  ErrorResponseDto,
  SuccessfulResponseDto,
} from 'src/common/dto/response.dto';
import { AuthService } from 'src/auth/auth.service';
import { AdminJwtAuthGuard } from 'src/auth/guard/admin-jwt-auth.guard';
import { AdminLocalAuthGuard } from 'src/auth/guard/admin-local-auth-guard';
import { CreateAdminDto } from '../admin/dto';
import ApiKeyGuard from 'src/auth/guard/api-key.guard';
import {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_LIFETIME_IN_MILLISECONDS,
} from 'src/auth/constant';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('admin/register')
  @UseGuards(ApiKeyGuard)
  async registerAdmin(@Body() dto: CreateAdminDto) {
    if (typeof dto.name !== 'string') {
      return new ErrorResponseDto('name must be string');
    }

    if (typeof dto.username !== 'string') {
      return new ErrorResponseDto('username must be string');
    }

    if (typeof dto.password !== 'string') {
      return new ErrorResponseDto('password must be string');
    }

    await this.authService.registerAdmin(dto);

    return new SuccessfulResponseDto();
  }

  @Post('admin/login')
  @UseGuards(AdminLocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async signin(@Request() req, @Response() res) {
    const token = await this.authService.generateAdminJwt(req.user);

    res.cookie(ACCESS_TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      maxAge: ACCESS_TOKEN_LIFETIME_IN_MILLISECONDS,
    });

    return res.send(new SuccessfulResponseDto());
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('admin/me')
  async profile(@Req() req: any) {
    return new SuccessfulResponseDto(req.user);
  }
}
