import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminLocalStrategy, AdminJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
