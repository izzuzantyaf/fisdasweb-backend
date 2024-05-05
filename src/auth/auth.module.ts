import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AuthController } from './auth.controller';
import { AwsSesModule } from 'src/common/aws-ses/aws-ses.module';
import ApiKeyStrategy from 'src/auth/strategies/api-key.strategy';

@Module({
  imports: [AdminModule, PassportModule, JwtModule.register({}), AwsSesModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminLocalStrategy,
    AdminJwtStrategy,
    ApiKeyStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
